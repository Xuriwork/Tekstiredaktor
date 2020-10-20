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
			padding: 20px;
			box-sizing: border-box;
		}
	}

	
	form {
		color: #ffffff;
		width: 800px;
		max-width: 95%;
		margin-top: 10px;
		
		.input-group {
			display: flex;
			flex-direction: column;
			width: 100%;

			input, label {
				width: 100%;
			}
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
		<form>

			<h3>Message Lifetime</h3>
			<div class='input-group'>
				<label for='messageLifetime'>Expires after</label>
				<input type='text' id='messageLifetime'  />
				
				<label for='numberOfViews'>or number of views</label>
				<input type='text' id='numberOfViews'  />
			</div>

			<h3>Passphrase</h3>
			<div class='input-group'>
				<label for='messagePassphrase'>Secure this message with a custom password</label>
				<input type='text' id='passphrase'  />
				
				<label for='confirmMessagePassphrase'>Confirm Passphrase</label>
				<input type='text' id='confirmMessagePassphrase'  />
			</div>
		</form>
</div>
