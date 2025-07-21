from .settings import *  # noqa: F403
import dj_database_url

DEBUG = False
ALLOWED_HOSTS = ['*']

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

DATABASES = {
    "default": dj_database_url.config(
        default="postgres://tomas:tomas@db:5432/taskhub"
    )
}
