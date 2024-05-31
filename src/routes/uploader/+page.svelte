<script lang="ts">
	import { Uploader } from '$lib/components/uploader'
</script>

<Uploader
	action={'?/uploadFile'}
	multiple={true}
	acceptedFileExtensions={['jpg', 'png']}
	maxFile={4}
	maxFileSize={50 * 1024}
	resultMessageType="all"
/>
