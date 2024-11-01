<template>
  <v-app class="pt-0 mt-0 pl-0 ml-0" id='LVMainWorkflow'>
    <div class="cui">
   <v-content class="pt-0 mt-0 pl-0 ml-0">
      <v-container
        fluid
      >
    <v-card
      class="mx-auto"
      max-width="500"
    >
      <v-toolbar
        flat
        dense
        color="elevation-4"
      >
        <v-toolbar-title class="title">Log Selection</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click="$refs.search.focus()"
        >
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar>

      <v-container class="py-0">
        <v-row dense
          align="center"
          justify="start"
        >
          <v-col
            v-for="(selection, i) in selections"
            :key="selection.text"
            class="shrink"
          >
            <v-chip class='ma-0'
              close
              close-icon="x"
              color="info"
              @click:close="selected.splice(i, 1)"
            >
              {{ selection.text }}
            </v-chip>
          </v-col>

          <v-col dense v-if="!allSelected" cols="12">
            <v-text-field dense
              ref="search"
              v-model="search"
              full-width
              hide-details
              label="Search"
              single-line
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-divider v-if="!allSelected"></v-divider>

      <v-list dense rounded>
        <template v-for="item in categories">
          <v-list-item class='dense pt-0 pl-0 pr-0 mt-0 pb-0 mb-0'
            v-if="!selected.includes(item)"
            :key="item.text"
            :disabled="loading"
            @click="selected.push(item)"
          >
            <v-list-item-avatar class='pt-0 pl-0 pr-0 mt-0 pb-0 mb-0'>
              <v-icon
                v-text="item.icon"
              ></v-icon>
            </v-list-item-avatar>
            <v-list-item-title class='pt-0 pl-0 pr-0 mt-0 pb-0 mb-0' v-text="item.text"></v-list-item-title>
          </v-list-item>
        </template>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-menu top :offset-y="offset">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :disabled="!selected.length"
            color="link_primary"
            text
            v-bind="attrs"
            v-on="on"
          >
            Time-Range
          </v-btn>
        </template>
        <!--    Select Time Range  -->
        <v-list>
          <v-list-item
            v-for="(timerange, index) in timeranges"
            :key="index"
          >
            <v-btn @click="updateSelected(timerange.title, timerange.value)">{{ timerange.title }}</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <span v-if="selected.length"> {{ timerange_selected.txt }}</span>
        <!--    Select Pull Log button -->
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!selected.length"
        :loading="loading"
        color="link_primary"
        text
        @click="next"
      >Next</v-btn>
      </v-card-actions>
      </v-card>
      </v-container>
    </v-content>
    </div>
  </v-app>
</template>

<script>
import { EventBus } from '@/utils'
import { collectlog } from '@/api'
export default {
  name: 'LVMainWorkflow',
  data: () => ({
    items: [
      {
        text: 'Call Manager',
        icon: 'widgets',
        name: 'cucm'
      },
      {
        text: 'Virtual Voice Browser',
        icon: 'widgets',
        name: 'vvb'
      },
      {
        text: 'CCE Finesse',
        icon: 'widgets',
        name: 'fin'
      },
      {
        text: 'CVP Vxml Logs',
        icon: 'widgets',
        name: 'cvpvxml'
      },
      {
        text: 'CVP Call Server Logs',
        icon: 'widgets',
        name: 'cvp'
      },
      {
        text: 'CCE LiveData',
        icon: 'widgets',
        name: 'livedata'
      },
      {
        text: 'CCE Peripheral Gateway',
        icon: 'widgets',
        name: 'pg'
      }
    ],
    timeranges: [
      { title: '10 minutes', value: '10' },
      { title: '30 minutes', value: '30' },
      { title: '1 hour', value: '60' },
      { title: '2 hours', value: '120' }
    ],
    timerange_selected: { txt: '', val: 60 },
    offset: true,
    loading: false,
    search: '',
    selected: []
  }),

  computed: {
    allSelected () {
      return this.selected.length === this.items.length
    },
    categories () {
      const search = this.search.toLowerCase()

      if (!search) return this.items

      return this.items.filter(item => {
        const text = item.text.toLowerCase()

        return text.indexOf(search) > -1
      })
    },
    selections () {
      const selections = []

      for (const selection of this.selected) {
        selections.push(selection)
      }

      return selections
    }
  },

  watch: {
    selected () {
      this.search = ''
    }
  },

  methods: {
    next () {
      this.loading = true
      this.$store.state.componentSelect = this.selected
      this.$store.state.logTimeSpan = this.timerange_selected.val
      var compArry = []
      var appList = ''
      this.selections.forEach(element => {
        compArry.push(element.name)
      })
      appList = compArry.join(',')
      var payload = { applications: appList, instant: 'wxcce', offset_time: this.timerange_selected.val }
      this.search = ''
      this.selected = []
      this.timerange_selected.txt = ''
      this.timerange_selected.val = 60
      collectlog(payload, this.$store.state.jwt).then(function (response) {
        // console.log('Got response from promise.' + response.data.status)
        EventBus.$emit('getlog')
      })
    },
    updateSelected (selectedItem, selectedVal) {
      this.timerange_selected.txt = '(' + selectedItem + ' Selected)'
      this.timerange_selected.val = selectedVal
    }
  }
}

</script>

<style scoped>

</style>
