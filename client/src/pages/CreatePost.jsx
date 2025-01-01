import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <Input
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
          />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='uncategorized'>Select a category</SelectItem>
              <SelectItem value='javascript'>JavaScript</SelectItem>
              <SelectItem value='reactjs'>React.js</SelectItem>
              <SelectItem value='nextjs'>Next.js</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <Input type='file' accept='image/*' />
          <Button
            type='button'
            variant="outline"
            size='sm'
          >
            Upload image
          </Button>
        </div>
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
        />
        <Button type='submit'>
          Publish
        </Button>
      </form>
    </div>
  )
}

