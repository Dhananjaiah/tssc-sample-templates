# GitOps Petstore API Application

## Petstore API Application 
This GitOps configuration provides deployment manifests for the Petstore API, a Python FastAPI application that provides a RESTful API for managing pets in a pet store.

The GitOps repository contains Kubernetes manifests for deploying the Petstore API including:
- Deployment with container configuration
- Service for internal networking
- Route for external access

The following day 2 edit/update operations are supported:
    set/get image - updates the container image for the Petstore API
    set/get replicas - adjusts the number of running pod replicas
