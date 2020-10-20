<script>
	import Modal from './Modal.svelte';
	
	let editorContent = '';
	let wordCount = 0;
	let characterCount = editorContent.length;
	let lineCount = 0;
	let fileInput;
	let isModalOpen = false;
	
	const calculateWordCount = () => {
		const spiltWords = editorContent.trim().split(/\s+/);
		wordCount = spiltWords.length;
		
		characterCount = editorContent.length;

		lineCount = editorContent.split('\n').length;
		lineCount = editorContent.split(/\r?\n|\r/).length;
	};

	const fileType = {
		type: 'text/plain;charset=utf-8'
	};

	const anchor = document.createElement('a');

	const saveFile = (filename) => {
		const blob = new Blob([editorContent], fileType);
		const objURL = URL.createObjectURL(blob);

		anchor.href = objURL;
		anchor.download = filename;
		anchor.click();
		
		URL.revokeObjectURL(objURL);
		closeModal();
	};

	const openInput = () => fileInput.click();
	const clearInput = (event) => event.target.value = null;
	
	const openFile = (input) => {
		const file = input.target.files[0];
		const reader = new FileReader();
		reader.readAsText(file);

		reader.onload = () => editorContent = reader.result;
		reader.onerror = () => console.log(reader.error);
	};

	const openModal = () => isModalOpen = !isModalOpen;
	const closeModal = () => isModalOpen = false;

</script>

<div class='app-component'>
	<div class='editor'>
		<textarea
			bind:value={editorContent}
			placeholder='Enter some text...'
			id='area'
			spellcheck='false'
			class='ember-text-area ember-view' 
			on:keyup={calculateWordCount}
		></textarea>
	</div>
	<div class='editor-footer'>
		<div>
			<span>Words: {wordCount}</span>
			<span>Characters: {characterCount}</span>
			<span>Lines: {lineCount}</span>
		</div>
		<div class='buttons-container'>
			<button on:click={openInput}>Open</button>
			<button on:click={openModal}>Save</button>
		</div>
		<input 
			type='file' 
			accept='text/plain' 
			bind:this={fileInput} 
			on:change={openFile} 
			style="display: none;" 
			on:click={clearInput}
		/>
	</div>
	{#if isModalOpen}
		<Modal saveFile={saveFile} closeModal={closeModal} />
	{/if}
</div>

<style type='scss'>

	%flex-column-center {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.app-component {
		@extend %flex-column-center;
		height: 100%;
		width: 100%;
	}

	.editor {
		width: 800px;
		max-width: 95%;
		height: 500px;
		border-radius: 10px 10px 0 0;
		background-color: #3A4556;
		padding: 5px;
		box-sizing: border-box;
		
		textarea {
			width: 100%;
			height: 100%;
			border-radius: 5px;
			resize: none;
			padding: 20px;
			box-sizing: border-box;
			background-color: #2D3848;
			color: #A4AEBA;
			border: none;

			&::placeholder {
				color: #A4AEBA;
			}

			&::-webkit-scrollbar-track	{
				border-radius: 6px;
			}

			&::-webkit-scrollbar {
				width: 6px;
				border-radius: 6px;
			}

			&::-webkit-scrollbar-thumb {
				background-color: #81E5D9;
				border-radius: 6px;
			}
		}
	}

	.editor-footer {
		background-color: #3A4556;
		color: #ffffff;
		width: 800px;
		max-width: 95%;
		border-radius: 0 0 10px 10px;
		padding-bottom: 8px;
		padding-left: 30px;
		padding-right: 30px;
		padding-top: 2px;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		> div {

			span {
				font-weight: 560;

				&:not(:last-of-type) {
				margin-right: 10px;
				}
			}
		}

		.buttons-container {
			button {
				padding: 0 20px;
			}
		}
	}
</style>