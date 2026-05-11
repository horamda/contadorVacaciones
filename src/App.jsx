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
        <div className="card-time">
            <div className="card-value">{formatearNumero(valor)}</div>
            <div className="card-label">{texto}</div>
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
        <main className="app-shell">
            <section className="hero-card">
                <div className="hero-badge">✈️ Cuenta regresiva</div>

                <h1 className="hero-title">Mis vacaciones empiezan en:</h1>

                <p className="hero-text">
                    Elige la fecha y hora de inicio de tus vacaciones.
                </p>

                <div className="input-row">
                    <label className="input-label">Fecha de inicio:</label>
                    <input
                        type="datetime-local"
                        value={fechaObjetivo}
                        onChange={(e) => setFechaObjetivo(e.target.value)}
                        className="date-input"
                    />
                </div>

                {!tiempo.finalizado ? (
                    <div className="grid-time">
                        <TarjetaTiempo valor={tiempo.dias} texto="Días" />
                        <TarjetaTiempo valor={tiempo.horas} texto="Horas" />
                        <TarjetaTiempo valor={tiempo.minutos} texto="Minutos" />
                        <TarjetaTiempo valor={tiempo.segundos} texto="Segundos" />
                    </div>
                ) : (
                    <div className="finished-card">
                        <div className="finished-emoji">🎉</div>
                        <h2 className="finished-title">¡Llegaron tus vacaciones!</h2>
                        <p className="finished-text">
                            Ahora sí, a descansar y disfrutar.
                        </p>
                    </div>
                )}

                <p className="footer-text">
                    El reloj se actualiza automáticamente cada segundo.
                </p>
            </section>
        </main>
    );
}
