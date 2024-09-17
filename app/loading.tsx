"use client";

export default function LoadingPage() {
  return (
    <div className="loading-container">
      <div className="car-container">
        <div className="car car-animation">{/* Imagen del coche */}</div>
      </div>
      <h1>Cargando...</h1>
    </div>
  );
}
