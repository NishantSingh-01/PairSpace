import { Link } from "react-router-dom";
import image404 from "../assets/image.png";
const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#070707f7] px-6">
            <div className="text-center max-w-2xl">


                <div className="mb-2 flex justify-center">
                    <img
                        src={image404}
                        alt="404 Page Not Found"
                        className="w-full max-w-xl object-contain"
                    />
                </div>


                <h2 className="mt-3 text-3xl md:text-3xl font-semibold font-mono text-white">
                    Page Not Found
                </h2>

                <p className="mt-3 text-gray-400">
                    The dashboard page you're looking for doesn't exist.
                </p>

                <Link
                    to="/home"
                    className="inline-flex items-center gap-2 mt-7 rounded-xl
                    bg-teal-400 px-6 py-3 font-medium text-black
                    transition-all duration-300 hover:bg-teal-300
                    hover:shadow-[0_0_25px_rgba(45,212,191,0.35)]"
                >
                    Go to Dashboard
                    <span className="text-xl">→</span>
                </Link>

            </div>
        </div>
    );
};

export default NotFound;

// In your routes:
// <Route path="*" element={<NotFound />} />

