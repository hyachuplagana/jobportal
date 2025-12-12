import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className={`relative container mx-auto px-6 py-20 md:py-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-5xl mx-auto text-center">
            {/* Logo and Title - Horizontal Layout */}
            <div className="mb-8 flex items-center justify-center gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <img
                  src="/icon.png"
                  alt="NepTalent Logo"
                  className="relative w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent leading-tight">
                Welcome to <span className="text-[#EE422F]">NepTalent</span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Nepal's premier job portal connecting talented professionals with exceptional opportunities
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/jobs"
                className="group relative px-8 py-4 bg-[#EE422F] text-primary-foreground rounded-lg font-medium text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/50 hover:-translate-y-1 w-full sm:w-auto"
              >
                <span className="relative z-10">Find Your Dream Job</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#EE422F] to-[#ff5544] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                to="/recruiter-dashboard"
                className="group relative px-8 py-4 bg-transparent border-2 border-accent text-accent rounded-lg font-medium text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-1 w-full sm:w-auto"
              >
                <span className="relative z-10 group-hover:text-accent-foreground transition-colors duration-300">Post a Job</span>
                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-foreground">
              Why Choose <span className="text-[#EE422F]">NepTalent</span>?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border/50">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-[#EE422F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Smart Job Matching</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our intelligent algorithm connects you with opportunities that match your skills and aspirations perfectly.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border/50">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Lightning Fast</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Apply to jobs in seconds with our streamlined application process. No more tedious forms.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border/50">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-[#EE422F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Verified Companies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Connect with trusted employers. Every company on our platform is thoroughly verified.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Job Seekers */}
            <div className="group relative bg-gradient-to-br from-card to-card/50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-border/50 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl transform translate-x-20 -translate-y-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#EE422F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">For Job Seekers</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Discover thousands of opportunities from Nepal's top companies. Your next career move starts here.
                </p>
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 text-[#EE422F] font-semibold group-hover:gap-4 transition-all duration-300"
                >
                  Browse Jobs
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Recruiters */}
            <div className="group relative bg-gradient-to-br from-card to-card/50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-border/50 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl transform translate-x-20 -translate-y-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">For Recruiters</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Find the perfect talent for your team. Post jobs and connect with qualified candidates instantly.
                </p>
                <Link
                  to="/recruiter-dashboard"
                  className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all duration-300"
                >
                  Start Hiring
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#EE422F] to-[#ff5544] text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group cursor-default">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">10K+</div>
              <div className="text-primary-foreground/80 text-sm md:text-base">Active Jobs</div>
            </div>
            <div className="group cursor-default">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">50K+</div>
              <div className="text-primary-foreground/80 text-sm md:text-base">Job Seekers</div>
            </div>
            <div className="group cursor-default">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">2K+</div>
              <div className="text-primary-foreground/80 text-sm md:text-base">Companies</div>
            </div>
            <div className="group cursor-default">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
              <div className="text-primary-foreground/80 text-sm md:text-base">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of professionals and companies already using NepTalent to achieve their goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="px-10 py-4 bg-[#EE422F] text-primary-foreground rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300"
              >
                Sign Up Now
              </Link>
              <Link
                to="/about"
                className="px-10 py-4 bg-transparent border-2 border-border text-foreground rounded-lg font-semibold text-lg hover:bg-secondary hover:border-secondary transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(-15px); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;