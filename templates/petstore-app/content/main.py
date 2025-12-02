import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Depends, Response
from pydantic import BaseModel
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, select
from fastapi.middleware.cors import CORSMiddleware
import yaml
from fastapi.openapi.utils import get_openapi


import os

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL environment variable is not set")

logging.basicConfig(
    format="%(asctime)s %(levelname)s %(message)s",
    level=logging.INFO
)
logger = logging.getLogger("petstore")

engine = create_async_engine(DATABASE_URL, echo=True)
Base = declarative_base()
async_session = async_sessionmaker(engine, expire_on_commit=False)


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database tables created")
    yield


app = FastAPI(title="Petstore API", lifespan=lifespan)

openapi_schema = get_openapi(
    title="Petstore API",
    version="1.0.0",
    routes=app.routes
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PetModel(Base):
    __tablename__ = "pets"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    species = Column(String, nullable=False)

class Pet(BaseModel):
    id: int
    name: str
    species: str

async def get_db():
    async with async_session() as session:
        yield session

@app.get("/pets", response_model=List[Pet])
async def list_pets(db: AsyncSession = Depends(get_db)):
    logger.info("Listing all pets")
    result = await db.execute(select(PetModel))
    pets = result.scalars().all()
    return [Pet(id=pet.id, name=pet.name, species=pet.species) for pet in pets]

@app.get("/pets/{pet_id}", response_model=Pet)
async def get_pet(pet_id: int, db: AsyncSession = Depends(get_db)):
    logger.info(f"Retrieving pet with id={pet_id}")
    pet = await db.get(PetModel, pet_id)
    if pet is None:
        logger.warning(f"Pet with id={pet_id} not found")
        raise HTTPException(status_code=404, detail="Pet not found")
    logger.info(f"Found pet: {pet}")
    return Pet(id=pet.id, name=pet.name, species=pet.species)

@app.post("/pets", response_model=Pet)
async def add_pet(pet: Pet, db: AsyncSession = Depends(get_db)):
    logger.info(f"Adding new pet with id={pet.id}")
    existing = await db.get(PetModel, pet.id)
    if existing:
        logger.error(f"Attempted to add pet with duplicate id={pet.id}")
        raise HTTPException(status_code=400, detail="Pet ID already exists")
    pet_obj = PetModel(id=pet.id, name=pet.name, species=pet.species)
    db.add(pet_obj)
    await db.commit()
    await db.refresh(pet_obj)
    logger.info(f"Pet added: {pet_obj}")
    return Pet(id=pet_obj.id, name=pet_obj.name, species=pet_obj.species)

@app.get("/openapi.yaml", response_class=Response)
def get_openapi_yaml():
    openapi_schema = app.openapi()
    yaml_schema = yaml.dump(openapi_schema, sort_keys=False, Dumper=yaml.SafeDumper, default_flow_style=False)
    return Response(content=yaml_schema, media_type="application/x-yaml")
