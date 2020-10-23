<script>
    import { fade } from 'svelte/transition';
    import Encrypt from "./Encrypt.svelte";
    import Decrypt from "./Decrypt.svelte";

    let modalOverlay;
    let isEncryptModalOpen = false;
    let isDecryptModalOpen = false;

    export let closeModal;
    export let editorContent;

    window.onclick = (e) => {
        if (e.target.contains(modalOverlay)) {
            closeModal();
        };
    };

    const showEncrypt = () => isEncryptModalOpen = !isEncryptModalOpen;
    const showDecrypt = () => isDecryptModalOpen = !isDecryptModalOpen;
    
</script>

<div class='modal-overlay' bind:this={modalOverlay}>
    {#if isDecryptModalOpen}
        <Decrypt />
    {:else}
    {#if isEncryptModalOpen}
        <Encrypt {editorContent} />
        {:else}
            <div class='modal'>
                <h3>Message Encryption</h3>
                <div class='buttons-container'>
                    <button on:click={showDecrypt}>Decrypt</button>
                    <button on:click={showEncrypt}>Encrypt</button>
                </div>
            </div>
        {/if}
    {/if}
</div>

<style lang='scss'>

    .modal-overlay {
        display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
        background-color: rgba(0, 0, 0, 0.26);
        position: fixed;
        width: 100%;
        height: 100%;

        .modal {
            width: 300px;
            max-width: 95%;
            height: 130px;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 5px 20px;
            box-sizing: border-box;
            border-radius: 5px;
            
            .buttons-container {
                margin-top: 15px;
                display: flex;
                justify-content: space-between;

                button {
                    text-decoration: none;
                    padding: 2px 20px;
                    border-radius: 2px;

                    &:first-of-type {
                        background-color: #21e6c1;
                        border: 2px solid #1dc7a8;
                        color: #ffffff;
                    }
                    
                    &:last-of-type {
                        margin-left: 10px;
                        background-color: #00d1ff;
                        border: 2px solid #08b2d8;
                        color: #ffffff;
                    }
                }
            }
        }
    }
</style>