import type{ UploadedImage } from '@/types'
import { actions } from 'astro:actions'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type Props = {
	label: string
	currentImage?: string
	featuredMedia?: number
}

export default function UploadImage({ label, currentImage, featuredMedia }: Props) {

	const [image, setImage] = useState<UploadedImage>()

	const onDrop = useCallback(async (files: File[]) => {
		const formData = new FormData()
		formData.append('file', files[0])
		const { data, error } = await actions.upload.uploadImage(formData)

		setImage(data)
	}, [])

	const maxFile = 1
	const {
		getRootProps,
		getInputProps,
		isDragAccept,
		isDragReject,
		isDragActive,
	} = useDropzone({
		onDrop,
		accept: {
			'image/jpeg': ['.jpg'],
			'image/png': ['.png'],
		},
		maxFiles: maxFile,
	})
	return <>
		<div className='col-span-full'>
			<label
				htmlFor='cover-photo'
				className='block text-sm/6 font-medium text-gray-900'
			>
				{label}
			</label>
			<div
				{...getRootProps({
					className: `
            mt-2 py-20 outline-1 outline-dashed -outline-offset-1 outline-gray-300 text-center cursor-pointer 
            ${
							isDragActive
								? 'outline-gray-900 text-gray-900 bg-gray-200 '
								: 'border-gray-400 text-gray-400 bg-white'
						} 
            ${isDragReject ? 'border-none cursor-not-allowed' : ''}`,
				})}
			>
				<svg
					className='mx-auto size-12 text-gray-600'
					viewBox='0 0 24 24'
					fill='currentColor'
					aria-hidden='true'
					data-slot='icon'
				>
					<path
						fillRule='evenodd'
						d='M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z'
						clipRule='evenodd'
					></path>
				</svg>
				<input {...getInputProps()} />
				{isDragAccept && <p>Suelta la Imagen</p>}
				{isDragReject && <p>Archivo no válido</p>}
				{!isDragActive && (
					<p className='text-gray-600'>
						{' '}
						<span className=''>Arrastra </span> y suelta una imagen aquí
					</p>
				)}
			</div>
		</div>
    {
      image && (
        <div className='py-5 space-y-3 sm:col-span-3'>
          <p className='font-bold'>Imagen del producto: {image.source_url}</p>
          <img src={image.source_url} alt="Imagen publicada" className='w-96' />
        </div>
      )
    }
	{
		currentImage && !image && (
			<div className='py-5 space-y-3 sm:col-span-3'>
				<p className='font-bold'>Imagen actual del producto:</p>
				<img src={currentImage} alt="Imagen publicada" />
			</div>
		)
	}

    <input type="hidden" name='featured_media' value={image?.id ? image.id : featuredMedia} />
  </>
}
