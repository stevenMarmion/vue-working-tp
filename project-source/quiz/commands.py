from .app import app, db

@app.cli.command()
def syncdb():
    """
        Create all tables described in the models
    """
    db.create_all()