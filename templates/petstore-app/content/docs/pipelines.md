# CI/CD Pipelines

This application uses a Trusted Application Pipeline for continuous integration and continuous deployment.

## Continuous Integration

The CI pipeline includes the following stages:

1. **Source Code Checkout** - Retrieves the source code from the repository
2. **Build** - Compiles the application and runs unit tests
3. **Container Image Build** - Creates a container image using the Dockerfile
4. **CVE Scanning** - Scans the container image for known vulnerabilities
5. **Security Scanning** - Performs static analysis security testing (SAST)
6. **Sign Image** - Applies cryptographic signatures to the container image
7. **Generate Attestations** - Creates SLSA provenance attestations
8. **Generate SBOM** - Creates a Software Bill of Materials

## Continuous Deployment

The CD pipeline uses GitOps principles:

1. **Update GitOps Repository** - Updates the image reference in the GitOps repository
2. **ArgoCD Sync** - ArgoCD detects changes and deploys to the target namespace
3. **Promotion** - Manual promotion from development → stage → production

## Pipeline Types

Two CI providers are supported:

- **Tekton (SLSA 3)** - Cloud-native pipeline with SLSA Level 3 compliance
- **Jenkins (SLSA 2)** - Traditional Jenkins pipeline with SLSA Level 2 compliance
