export default function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-r from-slate-900 to-indigo-950 py-10 text-center text-gray-300">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-sm">Join our newsletter for exclusive offers.</p>
        <form className="mt-4 flex w-full items-center justify-center gap-2">
          <label className="sr-only" htmlFor="newsletter">Email</label>
          <input id="newsletter" type="email" placeholder="you@example.com" className="w-full max-w-xs rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          <button className="btn-primary" type="button">Subscribe</button>
        </form>
        <p className="mt-6 text-xs text-gray-400">© {new Date().getFullYear()} Retail Market. All rights reserved.</p>
      </div>
    </footer>
  );
}
