<script lang="ts">
	import type { Snippet } from 'svelte'
	import { shortenString } from '$lib/utils'
	import { fileTypes } from '$lib/fileTypes'
	import { fade } from 'svelte/transition'
	import UploadCloud from '../icons/UploadCloud.svelte'
	import ResultOk from '$lib/components/icons/ResultOk.svelte'
	import ResultError from '$lib/components/icons/ResultError.svelte'
	import { cn } from '$lib/utils'
	import { enhance } from '$app/forms'

	type Props = {
		children?: Snippet
		id?: string
		action: string
		acceptedFileExtensions?: string[]
		multiple: boolean
		maxFileSize?: number
		maxFile?: number
		resultMessageType?: 'all' | 'errors' | 'valid'
	}

	type UploadItems = {
		valid: boolean
		fileName: string
		message: string
		separator?: boolean
	}

	let {
		children,
		id,
		action,
		acceptedFileExtensions = [],
		multiple = false,
		maxFile = 1,
		maxFileSize = 5 * 1024 * 1024,
		resultMessageType = 'all',
	}: Props = $props()

	const displayMaxFilenameLength = 20

	let acceptedFileTypes: string[] = $state([])

	let progress = $state(false)
	let files: FileList | undefined = $state()
	let validFileList: File[] = $state([])
	let uploadItems: UploadItems[] = $state([])

	// let resultMessageType: 'all' | 'errors' | 'valid' = 'all' // What kind of message should be displayed
	if (!id) {
		id = Math.random().toString(36).substring(7)
	}

	if (maxFile === 1) {
		multiple = false
	}

	let btnUploader: HTMLButtonElement
	let posted = $state(false)

	const setAcceptedFileTypes = () => {
		acceptedFileExtensions.forEach((extension) => {
			if (fileTypes[extension]) {
				if (acceptedFileTypes.includes(fileTypes[extension].mime)) return
				acceptedFileTypes = [...acceptedFileTypes, fileTypes[extension].mime]
			}
		})
	}

	/**
	 * This function validates the selected files
	 */
	const validator = () => {
		validFileList = []
		uploadItems = []
		let isValid = true
		let fileCount = 0
		Array.from(files!).forEach((file) => {
			let isValidFile = true

			/**
			 * If the user selects more files than the maxFile value, the rest of the files will be ignored
			 */
			if (fileCount >= maxFile) {
				uploadItems = [
					...uploadItems,
					{
						valid: false,
						fileName: shortenString(file.name, displayMaxFilenameLength),
						message: 'megengedett darabszám túllépés',
					},
				]
				isValid = isValidFile = false
			}

			/**
			 * If the selected files count is less than the maxFile value, validate the file other way
			 */
			if (isValidFile) {
				/**
				 * If the file size is bigger than the maxFileSize value, the file will be ignored
				 */
				if (file.size > maxFileSize) {
					uploadItems = [
						...uploadItems,
						{
							valid: false,
							fileName: shortenString(file.name, displayMaxFilenameLength),
							message: 'túl nagy a fájl mérete!',
						},
					]
					isValid = isValidFile = false
				}

				/**
				 * If the file type is not in the acceptedFileTypes array or file extension is not in the acceptedFileExtensions, the file will be ignored
				 */
				const extension = file.name.split('.').pop() ?? ''
				if (
					acceptedFileTypes.length > 0 &&
					!acceptedFileTypes.includes(file.type) &&
					!acceptedFileExtensions.includes(extension)
				) {
					uploadItems = [
						...uploadItems,
						{
							valid: false,
							fileName: shortenString(file.name, displayMaxFilenameLength),
							message: 'nem megfelelő fájl típus!',
						},
					]
					isValid = isValidFile = false
				}
			}

			if (isValidFile) {
				validFileList = [...validFileList, file]
				uploadItems = [
					...uploadItems,
					{
						valid: true,
						fileName: shortenString(file.name, displayMaxFilenameLength),
						message: 'ok',
					},
				]
			}

			fileCount++
			if (fileCount === maxFile) {
				uploadItems = [
					...uploadItems,
					{
						valid: false,
						fileName: '',
						message: '',
						separator: true,
					},
				]
			}
		})

		return isValid
	}

	const submitHandler = (isValidate: boolean = true) => {
		posted = true
		if (!isValidate || validator()) {
			btnUploader.click()
			// console.log('Files are valid')
			// setTimeout(() => {
			// 	console.log('Files are valid')
			// 	reset()
			// }, 2000)
		} else {
			console.log('Validation failed')
		}
	}

	const reset = () => {
		files = undefined
		uploadItems = []
		validFileList = []
		posted = false
	}

	// $inspect(files);
	//$inspect(fileList)
	setAcceptedFileTypes()
</script>

{#snippet listItem(item)}
	{#if (item.valid && resultMessageType === 'all') || (item.valid && resultMessageType === 'valid') || (!item.valid && resultMessageType === 'all') || (!item.valid && resultMessageType === 'errors')}
		{#if item.separator && resultMessageType === 'all'}<div
				class="my-2 border-b border-neutral-500"
			></div>
		{:else if !item.separator}
			<div class={cn(!item.valid && 'dark:text-red-300', 'flex items-center gap-2')}>
				<div>
					{#if item.valid}
						<ResultOk class="h-5 w-5" />
					{:else}
						<ResultError class="h-5 w-5" />{/if}
				</div>
				<div><strong>{item.fileName !== '' ? item.fileName + ':' : ''}</strong> {item.message}</div>
			</div>
		{/if}
	{/if}
{/snippet}

{#snippet list()}
	<aside
		in:fade={{ duration: 250 }}
		class="flex min-h-40 w-full flex-col justify-between gap-1 p-3 text-xs"
	>
		{#each uploadItems as item}
			{@render listItem(item)}
		{/each}
		<div
			class="mt-2 flex flex-col items-center justify-center gap-2 rounded-md bg-gray-400 p-2 dark:bg-gray-700"
		>
			{#if validFileList.length !== uploadItems.length && validFileList.length > 0}
				<div class="font-semibold">
					A feltöltési sor hibákat tartalmaz, feltölti a megfelelő fájlokat?
				</div>
				<div class="flex gap-2">
					<button class="btn btn-primary btn-xs" on:click={() => submitHandler(false)}>
						Feltölt
					</button>
					<button type="reset" class="btn btn-xs" onclick={reset}>Mégsem</button>
				</div>
			{:else if validFileList.length === 0}
				<div class="font-semibold dark:text-red-300">Sikertelen feltöltés!</div>
				<button type="reset" class="btn btn-xs" onclick={reset}>Vissza</button>
			{:else}
				<div class="font-semibold dark:text-green-400">Sikeres feltöltés!</div>
			{/if}
		</div>
	</aside>
{/snippet}

{#snippet uploaderInfo()}
	<div class="my-3 flex flex-col text-xs opacity-60">
		{#if maxFile > 1}
			<div>Max. <strong>{maxFile}</strong> files</div>
		{/if}
		<div>
			Max. file size: <strong>{Number((maxFileSize / 1024 / 1024).toFixed(2))} MB</strong>
		</div>
		{#if acceptedFileTypes.length > 0}
			<div>Accepted file types: <strong>{acceptedFileExtensions.join(', ')}</strong></div>
		{/if}
	</div>
{/snippet}

{#snippet uploadingProgress()}
	<div
		in:fade={{ duration: 250 }}
		class="flex min-h-40 flex-col items-center justify-center gap-1 text-sm"
	>
		<span class="loading loading-spinner loading-md"></span>
		Feltöltés folyamatban
	</div>
{/snippet}

{#snippet uploaderInput()}
	<div in:fade={{ duration: 250 }}>
		<input
			class="h-40 w-full cursor-pointer bg-transparent text-transparent file:hidden"
			type="file"
			name="files"
			bind:files
			accept={'.' + acceptedFileExtensions.join(',.')}
			{multiple}
			onchange={() => submitHandler()}
		/>
		<div
			class="pointer-events-none absolute top-0 flex h-full w-full flex-col justify-center text-center"
		>
			<div>
				<UploadCloud class="mx-auto h-10 w-10 " />
				Drag and drop or
				<span class="font-semibold text-primary">Browse</span> file(s)
				{@render uploaderInfo()}
			</div>
		</div>
	</div>
{/snippet}

<form
	{id}
	{action}
	method="post"
	enctype="multipart/form-data"
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		// `formElement` is this `<form>` element
		// `formData` is its `FormData` object that's about to be submitted
		// `action` is the URL to which the form is posted
		// calling `cancel()` will prevent the submission
		// `submitter` is the `HTMLElement` that caused the form to be submitted
		uploadItems = []
		formData.delete('files')
		for (const file of validFileList) {
			formData.append('files', file)
		}

		progress = true

		console.time('progress')
		return async ({ result, update }) => {
			progress = false
			console.timeEnd('progress')
			console.time('reset')

			setTimeout(() => {
				console.timeEnd('reset')
				reset()
			}, 2000)

			// `result` is an `ActionResult` object
			// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
		}
	}}
>
	{#if children}
		{@render children()}
	{/if}
	<div
		class="relative max-w-md rounded-md border border-dashed border-slate-300 opacity-80 transition-opacity duration-500 hover:opacity-100"
	>
		{#if uploadItems.length > 0 && !progress}
			{@render list()}
		{:else if progress}
			{@render uploadingProgress()}
		{:else}
			{@render uploaderInput()}
		{/if}
		<button class="hidden" bind:this={btnUploader}>Submit file</button>
	</div>
</form>
