from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
from database import connect_to_db
from psycopg2.extras import RealDictCursor

class Product(BaseModel):
    id: int
    name: str
    price: int
    inventory: int
    created_at: datetime

    class Config:
        from_attributes = True


app = FastAPI()


@app.get("/")
def root(): 
    return {"Fastapi works"}

@app.get("/products", response_model=list[Product])
def get_products():
    conn = None
    try:
        conn = connect_to_db()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute('SELECT id, "Name" as name, "Price" as price, inventory, created_at FROM public."Products" ORDER BY id ASC')
        products = cursor.fetchall()
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            cursor.close()
            conn.close()

    