from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DB_HOSTNAME: str
    DB_USERNAME: str
    DB_PASSWORD: str
    # SECRET_KEY: str
    DB_PORT: str
    DB_NAME: str
    AWS_SECRET_ACCESS_KEY: str
    AWS_ACCESS_KEY_ID: str

settings = Settings()

