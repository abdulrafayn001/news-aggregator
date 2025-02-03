# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

---

## Docker Setup

### Run the Project Using Docker

To run the application using Docker, follow these steps:

1. **Build and start the containers**

   Run the following command to build the Docker image and start the containers:

   ```bash
   docker compose up --build -d
   # This will:
   # - Build the image based on the Dockerfile
   # - Start the containers in detached mode (-d)
   # - Expose the app on port 5173
   ```

2. **Access the Application**

   Once the containers are up and running, you can access the application at:

   ```plaintext
   http://localhost:5173
   ```

3. **View Logs (Optional)**

   To view logs from the running containers, use:

   ```bash
   docker compose logs -f
   # This will stream the logs from the containers in real-time.
   # Press Ctrl + C to stop the log output.
   ```

4. **Stop and Remove Containers**

   To stop and remove the containers, use:

   ```bash
   docker compose down --volumes
   # This will stop the containers and remove the volumes.
   ```

That's it! Now you should have everything set up to run the project in Docker.

