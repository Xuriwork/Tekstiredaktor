<script>
    import { nanoid } from 'nanoid';
    import { fade } from 'svelte/transition';
    import { notyfEncrypted } from './utils/notyf';
    import checkIfEmpty from './utils/checkIfEmpty';

    export let editorContent;
    let passphrase = '';
    let errors = {};

    const generatePassphrase = () => passphrase = nanoid();
    
    const encryptText = () => {
        const { errors: _errors, valid } = checkIfEmpty(passphrase, editorContent);

        if (!valid) {
            return errors = _errors;
        };

        const encryptedText = sjcl.encrypt(passphrase, editorContent, { count: 2048, ks: 256 });
        notyfEncrypted(encryptedText);
    };
</script>

<div class='modal' transition:fade={{ duration: 200 }}>
    <h3>Encrypt</h3>
    <textarea
        bind:value={editorContent}
        spellcheck='false' 
        disabled={true}
        class:error={errors.message} 
    />
    {#if errors.message}
        <span style='color: #d72323;'>{errors.message}</span>
    {/if}
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
    <button on:click={generatePassphrase}>Generate passphrase</button>
    <button on:click={encryptText}>Encrypt</button>
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
        border-radius: 4px;

        &:nth-of-type(1) {
            margin-top: 15px;
        }

        &:nth-of-type(2) {
            background-color: #21e6c1;
            color: #ffffff;
            border: 2px solid #1a9e86;
        }
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
}    
</style>