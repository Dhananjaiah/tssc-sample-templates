# Creating an application with the Petstore API code sample

**Note:** The Petstore API code sample uses the **8000** HTTP port.

Before you begin creating an application with this `devfile` code sample, it's helpful to understand the relationship between the `devfile` and `Dockerfile` and how they contribute to your build.

1. The `devfile.yaml` file has an `image-build` component that points to your `Dockerfile`.
2. The `docker/Dockerfile` contains the instructions you need to build the code sample as a container image.
3. The `devfile.yaml` `kubernetes-deploy` component points to a `deploy.yaml` file that contains instructions for deploying the built container image.
4. The `devfile.yaml` `deploy` command completes the [outerloop](https://devfile.io/docs/2.2.0/innerloop-vs-outerloop) deployment phase by pointing to the `image-build` and `kubernetes-deploy` components to create your application.

## Application Overview

The Petstore API is a Python FastAPI application that provides a RESTful API for managing pets in a pet store. It uses:

- **FastAPI** - Modern, fast web framework for building APIs with Python
- **SQLAlchemy** - SQL toolkit and Object-Relational Mapping (ORM)
- **PostgreSQL** - Database backend with async support via asyncpg

## API Endpoints

- `GET /pets` - List all pets
- `GET /pets/{pet_id}` - Get a specific pet by ID
- `POST /pets` - Add a new pet
- `GET /openapi.yaml` - Get the OpenAPI specification

### Additional resources
* For more information about Python, see [Python](https://www.python.org/).
* For more information about FastAPI, see [FastAPI](https://fastapi.tiangolo.com/).
* For more information about devfiles, see [Devfile.io](https://devfile.io/).
* For more information about Dockerfiles, see [Dockerfile reference](https://docs.docker.com/engine/reference/builder/).
