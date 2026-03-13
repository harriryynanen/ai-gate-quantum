# Developer Notes

## Repository Safety: Managing Environment Variables

To ensure the security of the project, it is crucial to handle environment variables correctly. This prevents sensitive information, such as API keys, from being accidentally committed to the Git repository.

### Key Principles

- **`.env` is for local development only:** This file contains your personal Firebase configuration and other sensitive keys. It is **never** tracked in the Git repository.
- **`.env.example` is tracked:** This file serves as a template for other developers. It should list all the necessary environment variables but without their actual values.
- **Verify `.env` is not tracked:** Before committing, always check that your local `.env` file is not being tracked by Git. You can do this by running the following command:
  ```sh
  git status
  ```
  If `.env` appears in the output, it has been accidentally tracked and needs to be removed.

### How to Remove a Tracked `.env` File

If you have accidentally committed an `.env` file, you must remove it from Git's tracking history. Follow these steps to do so:

1.  **Remove the file from the index:**

    ```sh
    git rm --cached .env
    ```

2.  **Commit the change:**

    ```sh
    git commit -m "chore: Stop tracking .env file"
    ```

3.  **Update `.gitignore`:** Ensure that `.env` is listed in your `.gitignore` file to prevent it from being tracked in the future.

By following these guidelines, you can help maintain the security and integrity of the repository.
