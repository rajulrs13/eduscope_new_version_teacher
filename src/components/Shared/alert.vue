<template lang="html">
<v-snackbar :color="color"
 multi-line :timeout="timeout"
  :vertical="mode === 'vertical'"
   :value="snackbar" 
   :top="y === 'top'"
   dark>
    {{ text }}
</v-snackbar>
</template>

<script>
export default {
    props: [
        'text',
        'color'
    ],
    data() {
        return {
            snackbar: true,
            y:'',
            mode: '',
            timeout: 6000
        }
    }
}
</script>
