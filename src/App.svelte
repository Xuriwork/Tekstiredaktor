<script>
</script>

<style type='scss'>
	.app-component {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
	}

	.editor {
		width: 800px;
		max-width: 95%;
		height: 500px;
		border-radius: 5px;

		textarea {
			width: 100%;
			height: 100%;
			border-radius: 5px;
			resize: none;
			padding: 10px;
			box-sizing: border-box;
		}
	}
</style>

<div class='app-component'>
	<div class='editor'>
		<textarea
			spellcheck='false'
			placeholder='Enter some text...'
			id='area'
			class='ember-text-area ember-view' />
	</div>
</div>
