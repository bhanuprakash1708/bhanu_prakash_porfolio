import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8 px-6 md:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-center gap-4 mb-6">
          <a href="https://github.com/bhanuprakash1708" target="_blank" rel="noopener noreferrer" className="icon-circle w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50" aria-label="GitHub">
            <Github size={16} />
          </a>
          <a href="https://www.linkedin.com/in/bhanu-prakash-kanakamedala/" target="_blank" rel="noopener noreferrer" className="icon-circle w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href="mailto:bhanu.prakash1708@gmail.com" className="icon-circle w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50" aria-label="Email">
            <Mail size={16} />
          </a>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Bhanu Prakash Kanakamedala. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
