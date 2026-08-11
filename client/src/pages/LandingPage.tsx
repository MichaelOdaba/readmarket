import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Search, Upload } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Discover & Share <span className="text-primary">Collections</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Your personal marketplace for curated collections. Organize, upload,
            and discover products in beautifully themed collections. Build your
            digital library today.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/app/register"
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition flex items-center gap-2"
            >
              Start Free <ArrowRight size={20} />
            </Link>
            <Link
              to="/app/search"
              className="px-8 py-3 border border-slate-400 text-white rounded-lg font-semibold hover:bg-slate-700 transition"
            >
              Browse Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Why Choose readmarket?
          </h2>
          <p className="text-slate-300 text-center mb-16 max-w-2xl mx-auto">
            A modern platform built for creators and collectors to organize and
            share their digital assets.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-slate-700/50 rounded-xl border border-slate-600 hover:border-primary/50 transition">
              <BookOpen size={40} className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Organize Collections</h3>
              <p className="text-slate-300">
                Create and manage collections to organize your products and
                ideas. Keep everything organized and easy to find.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-slate-700/50 rounded-xl border border-slate-600 hover:border-primary/50 transition">
              <Search size={40} className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Smart Search</h3>
              <p className="text-slate-300">
                Instantly discover the products and collections you're looking
                for. Find exactly what you need in seconds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-slate-700/50 rounded-xl border border-slate-600 hover:border-primary/50 transition">
              <Upload size={40} className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Easy Upload</h3>
              <p className="text-slate-300">
                Upload and manage your products effortlessly. Add images,
                descriptions, and prices in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/20 to-transparent">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <p className="text-slate-300">Active Collections</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5000+</div>
              <p className="text-slate-300">Products Listed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-slate-300">Happy Creators</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators and find the perfect collections for your
            needs.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/app/register"
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition flex items-center gap-2"
            >
              Create Account <ArrowRight size={20} />
            </Link>
            <Link
              to="/app"
              className="px-8 py-3 border border-slate-400 text-white rounded-lg font-semibold hover:bg-slate-700 transition"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-12 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">readmarket</h4>
              <p className="text-slate-400 text-sm">
                Your personal marketplace for curated collections.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>
                  <Link to="/app/search" className="hover:text-white">
                    Browse
                  </Link>
                </li>
                <li>
                  <Link to="/app/register" className="hover:text-white">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2024 readmarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
