# Serve the static export from Nginx in Docker

The production image will contain only the Next.js static export and Nginx. HTTPS termination is delegated to the deployment platform or reverse proxy, while Nginx serves the public assets and response security headers.
