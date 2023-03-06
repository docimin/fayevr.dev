# https://fayevr.dev

# Setting up Rails 7 Server
Edit the `config/secrets.yml` file to include the following

Compile assets for production mode:
```bash
RAILS_ENV=production bundle exec rails assets:precompile
```