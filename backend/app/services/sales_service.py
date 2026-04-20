from typing import List

import pandas as pd

from app.config import DATA_PATH
from app.models.schemas import SalesItem


def get_all_sales() -> dict:
    df = pd.read_csv(DATA_PATH)
    items = []
    for _, row in df.iterrows():
        items.append(
            SalesItem(
                product_id=str(row["product_id"]),
                product_name=str(row["product_name"]),
                jumlah_penjualan=int(row["jumlah_penjualan"]),
                harga=int(row["harga"]),
                diskon=int(row["diskon"]),
                status=str(row["status"]),
            )
        )
    return {"total": len(items), "data": items}
