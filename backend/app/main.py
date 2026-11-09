from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timezone

app = FastAPI(
    title="NovaMesh AI API",
    description="Backend API for NovaMesh AI",
    version="0.1.0"
)

# Development CORS configuration.
# Restrict allowed origins before production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TextGenerationRequest(BaseModel):
    prompt: str
    style: str = "Realistic"
    quality: str = "Standard"


@app.get("/")
def home():
    return {
        "name": "NovaMesh AI API",
        "version": "0.1.0",
        "status": "online"
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }


@app.post("/api/generate/text")
def generate_text(request: TextGenerationRequest):
    if not request.prompt.strip():
        return {
            "status": "error",
            "message": "Prompt cannot be empty."
        }

    # AI model integration will be added in a later stage.
    return {
        "status": "not_configured",
        "message": "The 3D generation model has not been connected yet.",
        "prompt": request.prompt,
        "style": request.style,
        "quality": request.quality
    }


@app.post("/api/generate/image")
async def generate_image(file: UploadFile = File(...)):
    allowed_types = [
        "image/png",
        "image/jpeg",
        "image/webp"
    ]

    if file.content_type not in allowed_types:
        return {
            "status": "error",
            "message": "Only PNG, JPG, and WEBP images are supported."
        }

    return {
        "status": "not_configured",
        "message": "Image-to-3D generation is not connected yet.",
        "filename": file.filename,
        "content_type": file.content_type
    }
