import React, { useEffect, useState } from "react";

function calcularTiempoRestante(fechaObjetivo) {
  const ahora = new Date().getTime();
  const objetivo = new Date(fechaObjetivo).getTime();
  const diferencia = objetivo - ahora;

  if (!fechaObjetivo || isNaN(objetivo) || diferencia <= 0) {
    return {
      finalizado: true,
      dias: 0,
      horas: 0,
      minutos: 0,
      segundos: 0,
    };
  }

  return {
    finalizado: false,
    dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diferencia / (1000 * 60)) % 60),
    segundos: Math.floor((diferencia / 1000) % 60),
  };
}

function formatearNumero(numero) {
  return String(numero).padStart(2, "0");
}

function TarjetaTiempo({ valor, texto }) {
  return (
    <div className="bg-white/20 border border-white/30 rounded-3xl p-5 shadow-xl text-center backdrop-blur">
      <div className="text-5xl md:text-7xl font-black text-white">
        {formatearNumero(valor)}
      </div>
      <div className="mt-2 text-white/80 uppercase tracking-widest font-semibold">
        {texto}
      </div>
    </div>
  );
}

export default function App() {
  const [fechaObjetivo, setFechaObjetivo] = useState("");
  const [tiempo, setTiempo] = useState(calcularTiempoRestante(""));

  useEffect(() => {
    const fechaInicial = new Date();
    fechaInicial.setDate(fechaInicial.getDate() + 30);
    fechaInicial.setHours(8, 0, 0, 0);
    setFechaObjetivo(fechaInicial.toISOString().slice(0, 16));
  }, []);

  useEffect(() => {
    setTiempo(calcularTiempoRestante(fechaObjetivo));

    const intervalo = setInterval(() => {
      setTiempo(calcularTiempoRestante(fechaObjetivo));
    }, 1000);

    return () => clearInterval(intervalo);
  }, [fechaObjetivo]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-900 p-4">
      <section className="w-full max-w-5xl rounded-[32px] bg-white/10 border border-white/20 shadow-2xl p-6 md:p-10 text-center backdrop-blur-xl">
        <div className="inline-block bg-white/20 border border-white/20 rounded-full px-5 py-2 text-white font-bold mb-6">
          ✈️ Cuenta regresiva
        </div>

        <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">
          Mis vacaciones empiezan en:
        </h1>

        <p className="mt-4 text-white/80 text-lg">
          Elegí la fecha y hora de inicio de tus vacaciones.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3">
          <label className="text-white font-bold">Fecha de inicio:</label>
          <input
            type="datetime-local"
            value={fechaObjetivo}
            onChange={(e) => setFechaObjetivo(e.target.value)}
            className="rounded-2xl px-4 py-3 bg-white text-slate-900 font-bold shadow-lg outline-none"
          />
        </div>

        {!tiempo.finalizado ? (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <TarjetaTiempo valor={tiempo.dias} texto="Días" />
            <TarjetaTiempo valor={tiempo.horas} texto="Horas" />
            <TarjetaTiempo valor={tiempo.minutos} texto="Minutos" />
            <TarjetaTiempo valor={tiempo.segundos} texto="Segundos" />
          </div>
        ) : (
          <div className="mt-10 bg-white/20 border border-white/30 rounded-3xl p-8 text-white shadow-xl">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl md:text-5xl font-black">
              ¡Llegaron tus vacaciones!
            </h2>
            <p className="mt-3 text-white/80 text-lg">
              Ahora sí, a descansar y disfrutar.
            </p>
          </div>
        )}

        <p className="mt-8 text-white/70">
          El reloj se actualiza automáticamente cada segundo.
        </p>
      </section>
    </main>
  );
}
