<script>
import { mapActions } from 'vuex';
export default {
    methods: {
      ...mapActions([
        'logoutUsuario',
      ]),
    },
    created() {
        this.logoutUsuario();
        this.$router.push({name: 'login'});
    }
}
</script>