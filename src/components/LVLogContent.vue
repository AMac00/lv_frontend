<template>
  <div class="cui">
    <div class="content" style="height:100%;background-color:#fff">
      <div class="container">
        <b>Log span duration: within last {{ logTimeSpanVal }} minutes.</b>
        <header class="header header--tall">
        <div
          class="container"
          v-for="(componentSelect, index) in componentSelects"
          :key="index"
        >
          <div class="sections--compressed">
            <div class="text-left">
              <h6>{{ componentSelect.text }} Logs</h6>
              <a class="btn ciscoblue base-margin-top"
                target="_blank"
                :href="downloadByLink(componentSelect.name,logTimeSpanVal)"
                :download="downloadById(componentSelect.name,logTimeSpanVal)"
              >Download</a>
            </div>
          </div>
        </div>
        </header>
      </div>
      <v-btn
        class="btn ciscoblue base-margin-top text-center-lg"
        rounded
        @click="back"
      >Back</v-btn>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/utils'

export default {
  data: () => ({
    componentSelects: [],
    logTimeSpanVal: 60
  }),
  methods: {
    downloadByLink (comp, range) {
      // console.log('href ==> log_file_respository/' + comp + '-' + range + '.tar.gz')
      return 'log_file_respository/' + comp + '-' + range + '.tar.gz'
    },
    downloadById (comp, range) {
      // console.log('download =>' + comp + '-' + range + '.tar.gz')
      return comp + '-' + range + '.tar.gz'
    },
    back () {
      // console.log('back to prior page..')
      EventBus.$emit('logcollection')
      // this.$router.push('/')
    }
  },
  mounted () {
    this.componentSelects = this.$store.state.componentSelect
    this.logTimeSpanVal = this.$store.state.logTimeSpan
  }
}
</script>
