from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn

app = FastAPI(
    title="Parampara ML Service",
    description="Size recommendation and personalised ranking API",
    version="1.0.0"
)

class SizeRequest(BaseModel):
    user_id: str
    product_id: str
    height_cm: float
    weight_kg: float
    category_id: str

class SizeResponse(BaseModel):
    recommended_size: str
    confidence_score: float

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/v1/recommend-size", response_model=SizeResponse)
async def recommend_size(request: SizeRequest):
    # TODO: Load pickled sklearn classification model and predict based on user history and fit data.
    # Dummy mock response for now
    return SizeResponse(
        recommended_size="M",
        confidence_score=0.88
    )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
