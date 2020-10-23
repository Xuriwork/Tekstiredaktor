<script>
    import { notyfDecrypted } from './utils/notyf';
    import checkIfEmpty from './utils/checkIfEmpty';

    let encryptedText = '';
    let decryptedText = null;
    let passphrase = '';
    let errors = {};

    const decryptText = () => {
        const { errors: _errors, valid } = checkIfEmpty(passphrase, encryptedText);

        if (!valid) {
            return errors = _errors;
        };

        const _decryptedText = sjcl.decrypt(passphrase, encryptedText, { count: 2048, ks: 256 });
        decryptedText = _decryptedText;
        notyfDecrypted();
    };
</script>

<div class='modal'>
    <h3>Decrypt</h3>
    <label for='encryptedText'>Encrypted Text</label>
    <textarea
        bind:value={encryptedText}
        spellcheck='false' 
        class:error={errors.message} 
    />
    {#if errors.message}
        <span style='color: #d72323;'>{errors.message}</span>
    {/if}
    <label for='decryptedText'>Derypted Text</label>
    <textarea
        bind:value={decryptedText}
        disabled={true}
    />
    <label for='passphrase'>Passphrase</label>
    <input 
        type='text' 
        name='passphrase' 
        id='passphrase' 
        bind:value={passphrase} 
        class:error={errors.passphrase}  
    />
    {#if errors.passphrase}
        <span style='color: #d72323;'>{errors.passphrase}</span>
    {/if}
    <button on:click={decryptText}>Decrypt</button>
</div>

<style lang='scss'>
.modal {
    width: 500px;
    max-width: 95%;

    background-color: #3a4556;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 50px 20px;
    box-sizing: border-box;
    border-radius: 5px;

    h3 {
        margin-bottom: 5px;
    }
    
    button {
        margin-top: 10px;
    }

    input, textarea {
        background-color: #2d3848;
        border: 1px solid #171d25;
        color: #a4aeba;

        &.error {
            border: 1px solid #d72323;
        }
    }

    textarea {
        resize: none;
        height: 100px;
    }

    label {
        margin-top: 10px;
    }

    button {
        margin-top: 15px;
        border-radius: 4px;

        &:nth-of-type(2) {
            background-color: #21e6c1;
            color: #ffffff;
            border: 2px solid #1a9e86;
        }
    }
}    
</style>