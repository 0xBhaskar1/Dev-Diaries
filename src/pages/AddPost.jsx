import React from 'react'
import { Container,PostForm } from '@/components'

function AddPost() {
  return (
    <div className='py-12 bg-zinc-50 min-h-screen'>
        <Container>
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 pl-2">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                        Write a Story
                    </h1>
                    <p className="mt-2 text-zinc-500">
                        Share your knowledge, tutorials, or experiences with the community.
                    </p>
                </div>
                <PostForm />
                
            </div>
        </Container>
    </div>
  )
}

export default AddPost