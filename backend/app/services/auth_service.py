from app.config import DUMMY_PASSWORD, DUMMY_USERNAME


def authenticate_user(username: str, password: str) -> bool:
    return username == DUMMY_USERNAME and password == DUMMY_PASSWORD
