import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '.'
import { PenTool, Twitter, Github, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-white py-10">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
        
          <div className="flex flex-col gap-4">
          
            <Link to="/" className="flex items-center gap-2">
               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
                  <PenTool className="h-5 w-5" />
               </div>
               <span className="text-xl font-bold tracking-tight text-zinc-900">DevDiaries.</span>
            </Link>
            
            
            <div className="flex items-center gap-4 mt-2">
    
              <Link to="https://github.com/0xBhaskar1" target="_blank" className="text-zinc-400 hover:text-black transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link to="https://linkedin.com/in/bhaskar-kumar-ba9409324/" target="_blank" className="text-zinc-400 hover:text-black transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link to="https://instagram.com" target="_blank" className="text-zinc-400 hover:text-black transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: Navigation Links */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <Link to="https://github.com/0xBhaskar1" target="_blank" className="text-sm font-medium text-zinc-600 hover:text-black transition-colors">
              About Us
            </Link>
            <Link to="https://www.linkedin.com/in/bhaskar-kumar-ba9409324/" target="_blank"className="text-sm font-medium text-zinc-600 hover:text-black transition-colors">
              Contact Us
            </Link>
  
          </div>

        </div>

        
        <div className="mt-8 border-t border-zinc-100 pt-6 text-center md:text-left">
          <p className="text-sm text-zinc-400">
            &copy; {new Date().getFullYear()} DevDiaries. All rights reserved.
          </p>
        </div>
        
      </Container>
    </footer>
  )
}