import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input, Select, RTE } from './index'
import dbService from '@/appwrite/db'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'

function PostForm({ post }) {
  const { handleSubmit, setValue, register, watch, control, getValues, setError, formState: { errors } } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
      category: post?.category || "Technology"
    }
  })
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData)

  const create = async (data) => {
    setLoading(true);

    try {
      if (post) {
        const file = data.image[0] ? await dbService.uploadFile(data.image[0]) : null

        if (file) {
          await dbService.deleteFile(post.featuredImage)
        }
        const dbPost = await dbService.updatePost(post.$id, {
          ...data,
          userID: userData.$id,
          owner: userData.name,
          featuredImage: file ? file.$id : undefined
        })

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }

      } else {
        const file = await dbService.uploadFile(data.image[0])

        if (file) {
          const dbPost = await dbService.createPost({
            ...data,
            featuredImage: file.$id,
            userID: userData.$id,
            owner: userData.name
          })

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`)
          }

        }
      }

    } catch (error) {
      console.log("Submit post failed ::", error);
      if (error.code === 409) {
        setError("slug", {
          type: "manual",
          message: "This URL is already taken. Please customize the slug."
        }, { shouldFocus: false });
      }
      else {
        setError("root", {
          type: "manual",
          message: error.message || "Something went wrong. Please try again."
        });
      }
    } finally {
      setLoading(false)
    }
  }

  const slugTransform = useCallback((value) => {
    return value ? value.trim()
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-") : ""
  }, [])


  useEffect(() => {

    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true })
      }
    })

    return () => {
      subscription.unsubscribe();
    }
  }, [watch, slugTransform, setValue])



  return (
    <form onSubmit={handleSubmit(create)} className="flex flex-wrap">

      <div className="w-full px-2 lg:w-2/3">
        <Input
          label="Title :"
          placeholder="Enter post title"
          className="mb-4"
          {...register("title", { required: "title is required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1 mb-4">{errors.title.message}</p>
        )}
        <Input
          label="Slug :"
          placeholder="post-url-slug"
          disabled={true}
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        {errors.slug && (
          <p className="text-red-500 text-sm mt-1 mb-4">{errors.slug.message}</p>
        )}
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>


      <div className="w-full px-2 lg:w-1/3 mt-8 lg:mt-0">


        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Select
          options={["Technology", "Coding", "Design", "Productivity", "Tutorials", "Career", "AI & ML"]}
          label="Category"
          className="mb-4"
          {...register("category", { required: true })}
        />


        <Input
          label="Featured Image :"
          type="file"
          className="mb-4 cursor-pointer file:cursor-pointer file:bg-black file:text-white file:border-0 file:rounded-md file:px-2 file:text-sm file:mr-4 hover:file:bg-zinc-800"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post ? "Featured Image is Required" : false })}
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1 mb-4">{errors.image.message}</p>
        )}

        {post && (
          <div className="w-full mb-4 rounded-lg border border-zinc-200 overflow-hidden">
            <img
              src={dbService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}


        <Button
          type="submit"
          className={`w-full ${post ? "bg-green-600 hover:bg-green-700" : "bg-black hover:bg-zinc-800"}`}
          disabled={loading}
        >
          {loading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
          ) : (
            post ? "Update Post" : "Submit Post"
          )}
        </Button>
      </div>
    </form>
  )
}

export default PostForm