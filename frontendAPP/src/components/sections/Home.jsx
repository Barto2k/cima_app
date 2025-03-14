import { Link } from 'react-router-dom';
import RevealOnClick from '../RevealOnClick';

export const Home = () => {
    return (
        <RevealOnClick>
        <section id='home' className="w-full min-h-screen flex items-center justify-center relative">
                <div className="text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-right">
                        Bienvenidos a CIMA
                    </h1>
                    
                    <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto ">
                        Software actualmente en desarrollo por Marco Figueroa
                    </p>
                    <div className='flex justify-center space-x-4'>
                        <Link to='/pacientes' className='border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium hover:-translate-y-0.5 
                        hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-900 hover:text-white transition-all duration-200'>
                            Ver mis Pacientes
                        </Link>

                        <Link to='/' className='border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium hover:-translate-y-0.5 
                        hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-900 hover:text-white transition-all duration-200'>
                            Ver mi Calendario
                        </Link>
                    </div>
                    <div className='flex justify-center mt-4'>
                        <Link to='https://docs.google.com/document/d/10DBd3953aqMidv0-IaaDbwXJNZdi_5vL-lsdTJlCSGI/edit?usp=sharing' className='border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium hover:-translate-y-0.5 
                        hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-900 hover:text-white transition-all duration-200'>
                            Ver Instructivo
                        </Link>
                    </div>
                </div>
        </section>
        </RevealOnClick>
    );
};