<script>
    let modalOverlay;
    let filename;
    export let saveFile;
    export let closeModal;
	export let isModalOpen;

    import { fly } from 'svelte/transition';

    
    window.onclick = (e) => {
        if (e.target.contains(modalOverlay)) {
            closeModal();
        };
    };
    
</script>

<div class='modal-overlay' bind:this={modalOverlay}>
    {#if isModalOpen}
        <div class='modal' transition:fly={{ y: 100, duration: 200 }}>
            <label for='filename'>Filename</label>
            <input type='text' id='filename' bind:value={filename} />
            <div class='buttons-container'>
                <button on:click={closeModal}>Cancel</button>
                <button on:click={saveFile(filename)}>Save</button>
            </div>
        </div>
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
                margin-top: 10px;
                display: flex;
                justify-content: flex-end;

                button {
                    padding: 2px 20px;

                    &:first-of-type {
                        margin-right: 10px;
                    }

                    &:last-of-type {
                        background-color: #278ea5;
                        border: 2px solid #237c91;
                        color: #ffffff;
                    }
                }
            }
        }
    }
</style>