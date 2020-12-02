<template>
  <div>
    <div :class="{container: viewOnly}">
      <div :class="{row: viewOnly}">
        <div class="col s6 left-align" v-if="viewOnly">
          <router-link :to="{ name: 'notes-update', params: { id: note.id }}" class="btn"><i class="material-icons">edit</i></router-link>
          <DeleteBtn @delete="deleteItem" />
        </div>
        <div class="right-align" :class="{ col: viewOnly, s6: viewOnly }">
          <CompletedCheckbox @checked="check" :checked="note.completed" />
        </div>
      </div>
      <h4 :class="{ truncate: !viewOnly }">{{ note.title }}</h4>
      <p :class="{ truncate: !viewOnly }">{{ note.content }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import db from '@/components/firebaseInit'
import CompletedCheckbox from '@/components/views/common/CompletedCheckbox'
import DeleteBtn from '@/components/views/common/DeleteBtn'

export default {
  name: 'NoteItem',
  props: ['noteItem'],
  components: {
    CompletedCheckbox,
    DeleteBtn
  },
  data () {
    return {
      note: this.noteItem,
      viewOnly: false
    }
  },
  created() {
    if(this.$route.params.id) {
      this.viewOnly = true
      const id = this.$route.params.id
      this.note = this.getNoteById(id)
    }
  },
  computed: {
    ...mapGetters(['notesList', 'getNoteById'])
  },  
  watch: {
  },    
  methods: {
    ...mapActions(['isNoteCompleted', 'deleteNote', 'getNotes']),
    check: function(isChecked) {
      this.isNoteCompleted({ id: this.note.id, completed: isChecked })
    },
    deleteItem () {
      this.deleteNote(this.note.id).then(() => this.$router.push("/"))
    }
  }
}
</script>