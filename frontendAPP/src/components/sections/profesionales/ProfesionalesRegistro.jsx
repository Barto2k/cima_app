import React from "react";
import { useForm } from "react-hook-form";

export default function ProfesionalRegistro({
    AccionABMC,
    Profesional,
    Grabar,
    Volver,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ values: Profesional });

    const onSubmit = (data) => {
        Grabar(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
                <fieldset disabled={AccionABMC === "C"} className="space-y-4">
                    {/* campo Nombre */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <label className="w-full md:w-1/4 text-gray-700" htmlFor="Nombre">
                            Nombre<span className="text-red-500">*</span>:
                        </label>
                        <div className="w-full">
                            <input
                                type="text"
                                {...register("Nombre", {
                                    required: { value: true, message: "Nombre es requerido" },
                                    minLength: {
                                        value: 5,
                                        message: "Nombre debe tener al menos 5 caracteres",
                                    },
                                    maxLength: {
                                        value: 60,
                                        message: "Nombre debe tener como máximo 60 caracteres",
                                    },
                                })}
                                autoFocus
                                className={`w-full px-4 py-2 border rounded-2xl shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                                    errors?.Nombre ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {errors?.Nombre && touchedFields.Nombre && (
                                <p className="mt-2 text-sm text-red-600">{errors?.Nombre?.message}</p>
                            )}
                        </div>
                    </div>

                    {/* campo Apellido */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <label className="w-full md:w-1/4 text-gray-700" htmlFor="Apellido">
                            Apellido<span className="text-red-500">*</span>:
                        </label>
                        <div className="w-full">
                            <input
                                type="text"
                                {...register("Apellido", {
                                    required: { value: true, message: "Apellido es requerido" },
                                    minLength: {
                                        value: 5,
                                        message: "Apellido debe tener al menos 5 caracteres",
                                    },
                                    maxLength: {
                                        value: 60,
                                        message: "Apellido debe tener como máximo 60 caracteres",
                                    },
                                })}
                                className={`w-full px-4 py-2 border rounded-2xl shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                                    errors?.Apellido ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {errors?.Apellido && touchedFields.Apellido && (
                                <p className="mt-2 text-sm text-red-600">{errors?.Apellido?.message}</p>
                            )}
                        </div>
                    </div>

                    {/* campo Activo */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <label className="w-full md:w-1/4 text-gray-700" htmlFor="Activo">
                            Activo<span className="text-red-500">*</span>:
                        </label>
                        <div className="w-full">
                            <select
                                {...register("Activo", {
                                    required: { value: true, message: "Activo es requerido" },
                                })}
                                className={`w-full px-4 py-2 border rounded-2xl shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                                    errors?.Activo ? "border-red-500" : "border-gray-300"
                                }`}
                            >
                                <option value={null}></option>
                                <option value={false}>NO</option>
                                <option value={true}>SI</option>
                            </select>
                            {errors?.Activo && (
                                <p className="mt-2 text-sm text-red-600">{errors?.Activo?.message}</p>
                            )}
                        </div>
                    </div>
                </fieldset>

                {/* Botones Grabar, Cancelar/Volver */}
                <div className="flex justify-center space-x-4 mt-6">
                    {AccionABMC !== "C" && (
                        <button type="submit" className="border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium hover:-translate-y-0.5 
                        hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-900 hover:text-white transition-all duration-200">
                            <i className="fa fa-check"></i> Grabar
                        </button>
                    )}
                    <button
                        type="button"
                        className="border border-yellow-500/50 text-yellow-500 py-3 px-6 rounded font-medium hover:-translate-y-0.5 
                        hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-yellow-500 hover:text-white transition-all duration-200"
                        onClick={() => Volver()}
                    >
                        <i className="fa fa-undo"></i>
                        {AccionABMC === "C" ? " Volver" : " Cancelar"}
                    </button>
                </div>

                {/* texto: Revisar los datos ingresados... */}
                {!isValid && isSubmitted && (
                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                        <i className="fa fa-exclamation-sign"></i>
                        Revisar los datos ingresados...
                    </div>
                )}
            </div>
        </form>
    );
}