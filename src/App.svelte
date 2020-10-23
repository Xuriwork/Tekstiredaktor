<script>
	import Modal from './Modal.svelte';
	import { writable } from 'svelte/store';
	import EncryptDecryptModalContainer from './EncryptDecryptModalContainer.svelte';

	let editorContent = '';
	let wordCount = 0;
	let characterCount = editorContent.length;
	let lineCount = 0;
	let fileInput;
	let isModalOpen = false;
	let isModalEncryptOpen = false;
	
	let editor;
	let editorFooter;

	let storedIsFullscreen = JSON.parse(localStorage.getItem('fullscreen'));
	let isFullscreen = writable(storedIsFullscreen);

	isFullscreen.subscribe((value) => {
		value = value === null ? false : value;
		storedIsFullscreen = value;
		localStorage.setItem('fullscreen', value);
	});

	const calculateWordCount = () => {
		const spiltWords = editorContent.trim().split(/\s+/);
		wordCount = spiltWords.length === 1 && spiltWords[0] === '' ? 0 : spiltWords.length;

		characterCount = editorContent.length;

		lineCount = editorContent === '' ? 0 : editorContent.split('\n').length;
		lineCount = editorContent === '' ? 0 : editorContent.split(/\r?\n|\r/).length;

	};

	const fileType = {
		type: 'text/plain;charset=utf-8',
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
	const clearInput = (event) => (event.target.value = null);

	const openFile = (input) => {
		const file = input.target.files[0];
		const reader = new FileReader();
		reader.readAsText(file);

		reader.onload = () => (editorContent = reader.result);
		reader.onerror = () => console.log(reader.error);
	};

	const openModal = () => (isModalOpen = !isModalOpen);
	const closeModal = () => {
		isModalOpen = false;
		isModalEncryptOpen = false;
	};
	const openEncryptModal = () => (isModalEncryptOpen = !isModalEncryptOpen);

	const toggleFullScreen = () => isFullscreen.update(v => !JSON.parse(v));

</script>

<div class='app-component'>
	<div class='editor' class:isFullscreen='{storedIsFullscreen}' bind:this={editor}>
		<button class='fullscreen-button' on:click={toggleFullScreen}>
			{#if storedIsFullscreen}
				<img src='./assets/minimize.svg' alt='minimize' />
			{:else}
				<img src='./assets/maximize.svg' alt='maximize' />
			{/if}
		</button>
		<label for='editorContent'></label>
		<textarea
			bind:value={editorContent}
			placeholder='Enter some text...'
			id='editorContent'
			spellcheck='false'
			on:keyup={calculateWordCount} />
	</div>
	<div class='editor-footer' class:isFullscreen='{storedIsFullscreen}' bind:this={editorFooter}>
		<div>
			<span>words: {wordCount}</span>
			<span>characters: {characterCount}</span>
			<span>lines: {lineCount}</span>
		</div>
		<div class='buttons-container'>
			<button on:click={openEncryptModal}>Encrypt/Decrypt</button>
			<button on:click={openInput}>Open</button>
			<button on:click={openModal}>Save</button>
		</div>
		<input
			type='file'
			accept='text/plain'
			bind:this={fileInput}
			on:change={openFile}
			style='display: none;'
			on:click={clearInput} />
	</div>
	{#if isModalOpen}
		<Modal {saveFile} {closeModal} {isModalOpen} />
	{/if}

	{#if isModalEncryptOpen}
		<EncryptDecryptModalContainer {closeModal} {editorContent} />
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

	.fullscreen-button {
		@extend %flex-column-center;
		width: 30px;
		height: 30px;
		text-align: center;
		background-color: transparent;
		border: none;
		position: absolute;
		top: 15px;
		right: 15px;

		img {
			text-align: center;
			vertical-align: middle;
		}
	}

	.editor {
		width: 800px;
		max-width: 95%;
		height: 500px;
		border-radius: 10px 10px 0 0;
		background-color: #3a4556;
		padding: 5px;
		box-sizing: border-box;
		position: relative;
		transition: all 0.4s ease-in-out;

		&.isFullscreen {
			max-width: 100%;
			width: 100%;
			height: 100%;
			border-radius: 0;
		};

		textarea {
			width: 100%;
			height: 100%;
			border-radius: 5px;
			resize: none;
			padding: 20px;
			box-sizing: border-box;
			background-color: #2d3848;
			color: #a4aeba;
			border: none;

			&::placeholder {
				color: #a4aeba;
			}

			&::-webkit-scrollbar-track {
				border-radius: 6px;
			}

			&::-webkit-scrollbar {
				width: 6px;
				border-radius: 6px;
			}

			&::-webkit-scrollbar-thumb {
				background-color: #81e5d9;
				border-radius: 6px;
			}
		}
	}

	.editor-footer {
		background-color: #3a4556;
		color: #ffffff;
		width: 800px;
		max-width: 95%;
		border-radius: 0 0 10px 10px;
		padding: 2px 30px 8px;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		transition: all 0.4s ease-in-out;

		&.isFullscreen {
			max-width: 100%;
			width: 100%;
			border-radius: 0;
			padding: 10px;
			padding-bottom:  15px;
		};

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
				padding: 2px 20px;
				border-radius: 4px;
				border: 2px solid #cccccc;
				height: 30px;
				box-sizing: border-box;

				&:nth-child(1) {
					color: #ffffff;
					border: 2px solid #c26844;
					background-color: #ff8a5c;
				}

				&:nth-child(2) {
					margin: 0 10px;
				}

				&:nth-child(3) {
					color: #ffffff;
					border: 2px solid #217183;
					background-color: #3aa2b9;
				}
			}
		}
	}


	@media (max-width: 600px) {

		.fullscreen-button {
			display: none;
		}

		.editor {
			max-width: 100%;
			width: 100%;
			height: 100%;
			border-radius: 0;
		}

		.editor-footer {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			max-width: 100%;
			width: 100%;
			border-radius: 0;
			padding: 10px;
			padding-bottom:  10px;
			padding-left: 15px;

			.buttons-container {
				display: flex;
				width: 100%;
				margin-top: 8px;
			}
		}
	}

</style>