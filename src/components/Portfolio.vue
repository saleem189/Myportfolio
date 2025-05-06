<template>
  <div
    class="py-4 p-st"
    :class="{
      'bg-light': !nightMode,
      'bg-dark2': nightMode,
      'text-light': nightMode,
    }"
  >
    <div class="container">
      <div
        class="text-center"
        data-aos="fade"
        data-aos-once="true"
        data-aos-duration="1000"
      >
        <span
          class="title text-center"
          :class="{ pgray: !nightMode, 'text-light': nightMode }"
          >Portfolio.</span
        >
      </div>
      <hr
        width="50%"
        :class="{ pgray: !nightMode, 'bg-secondary': nightMode }"
      />

      <tabs :options="{ useUrlFragment: false }">
        <tab name="development">
          <div v-if="isLoading" class="row">
            <div class="col-xl-4 col-bg-4 col-md-6 col-sm-12" v-for="n in 3" :key="n">
              <SkeletonLoader :nightMode="nightMode" :lines="4" />
            </div>
          </div>
          <div v-else class="row">
            <div
              class="col-xl-4 col-bg-4 col-md-6 col-sm-12"
              v-for="(portfolio, idx) in portfolio_info"
              :key="portfolio.name"
            >
              <Card
                :style="{ 'transition-delay': (idx % 3) / 4.2 + 's' }"
                :portfolio="portfolio"
                @show="showModalFn"
                data-aos="fade-up"
                :nightMode="nightMode"
                data-aos-offset="100"
                data-aos-delay="10"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
              />
            </div>
          </div>
          <div class="text-center py-3" v-if="showBtn !== 'show less' && !isLoading">
            <button class="btn" @click.prevent="showMore">{{ showBtn }}</button>
          </div>
        </tab>

        <tab name="design">
          <div v-if="isLoading" class="row">
            <div class="col-xl-6 col-bg-6 col-md-12 col-sm-12" v-for="n in 2" :key="n">
              <SkeletonLoader :nightMode="nightMode" :lines="3" />
            </div>
          </div>
          <div v-else class="row">
            <div
              v-for="(design, idx) in desgin_info"
              :key="idx"
              :class="{ 'mt-4': idx === 0 ? true : true }"
              class="col-xl-6 col-bg-6 col-md-12 col-sm-12"
              style="position: relative;"
            >
              <vueper-slides 
                :dragging-distance="50"
                fixed-height="300px"
                :bullets="false"
                slide-content-outside="bottom"
                style="position: aboslute"
                @click.prevent="showDesignModalFn(design)"
              >
                <vueper-slide
                  v-for="(slide, i) in design.pictures"
                  :key="i"
                  :image="slide.img"
                />
              </vueper-slides>
              <div
                style="width: 100%; display: flex; justify-content: space-between"
                class="mt-2"
              >
                <div>
                  <div class="title2" style="font-weight: 500;">{{ design.title }}</div>
                  <span
                    class="badge mr-2 mb-2"
                    v-for="tech in design.technologies"
                    :key="tech"
                    :class="{ 'bg-dark4': nightMode }"
                    >{{ tech }}</span
                  >
                  •
                  <span class="date ml-1">{{design.date}}</span>
                </div>
                <button
                  style="height: 31px; margin-top: 5px;"
                  class="btn-sm btn btn-outline-secondary no-outline"
                  @click.prevent="showDesignModalFn(design)"
                >
                  read more
                </button>
              </div>
            </div>
          </div>
          <br />
        </tab>
      </tabs>
    </div>
    <transition name="modal">
      <Modal
        :showModal="showModal"
        @close="closeModal"
        v-if="showModal"
        :portfolio="modal_info"
        :nightMode="nightMode"
      />
    </transition>
    <transition name="modal">
      <DesignModal
        :showModal="showDesignModal"
        @close="closeModal"
        v-if="showDesignModal"
        :portfolio="design_modal_info"
        :nightMode="nightMode"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, watch, defineProps, onMounted } from 'vue';
import Card from "@/components/helpers/Card.vue";
import Modal from "@/components/helpers/Modal.vue";
import DesignModal from "@/components/helpers/DesignModal.vue";
import {Tabs, Tab} from 'vue3-tabs-component';
import SkeletonLoader from "@/components/SkeletonLoader.vue";

import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

import info from "../../info";

let portfolio_info = ref([]);
let desgin_info = ref(info.portfolio_design);
let showModal = ref(false);
let showDesignModal = ref(false);
let modal_info = reactive({});
let design_modal_info = reactive({});
let number = ref(3);
let showBtn = ref("show more");
let shower = ref(0);
let { nightMode } = defineProps({
  nightMode: Boolean,
});

let all_info = info.portfolio;

const isLoading = ref(true);

onMounted(() => {
  // Simulate loading time
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

for (var i = 0; i < number.value; i++) {
  portfolio_info.value.push(all_info[i]);
}

let showMore = () => {
  if (number.value != all_info.length) {
    number.value += 3;

    window.scrollBy({
      top: document.getElementsByClassName("smcard")[0].clientHeight,
      behavior: "smooth",
    });

    if (number.value > all_info.length)
      number.value = all_info.length;
  }

  if (number.value == all_info.length && shower.value == 0) {
    shower.value = 1;
    showBtn.value = "show less";
  } else if (number.value == all_info.length && shower.value == 1) {
    var elementPosition = document.getElementById("portfolio").offsetTop;
    window.scrollTo({ top: elementPosition + 5, behavior: "smooth" });
    shower.value = 0;
    number.value = 3;
    showBtn.value = "show more";
  }
};

let showModalFn = (portfolio) => {
  modal_info = portfolio;
  showModal.value = true;
};

let showDesignModalFn = (design_portfolio) => {
  design_modal_info = design_portfolio;
  showDesignModal.value = true;
};

let closeModal = () => {
  showModal.value = false;
  showDesignModal.value = false;
  document.getElementsByTagName("body")[0].classList.remove("modal-open");
};

watch(number, () => {
  portfolio_info.value = [];
  for (var i = 0; i < number.value; i++) {
    portfolio_info.value.push(all_info[i]);
  }
});
</script>

<style scoped>
.title {
  font-size: 30px;
  font-weight: 500;
}
.title1 {
  font-size: 24px;
  font-weight: 400;
}

.title2 {
  font-size: 20px;
  font-weight: 400;
}

.title3 {
  font-size: 16px;
  font-weight: 400;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.btn {
  border-color: rgb(212, 149, 97);
  color: rgb(212, 149, 97);
}

.btn:hover {
  background-color: rgb(212, 149, 97);
  border-color: rgb(212, 149, 97);
  color: white;
}

.btn:focus {
  background-color: rgb(212, 149, 97);
  border-color: rgb(212, 149, 97);
  color: white;
}

/* Nav class */
.tabs-component :deep(.tabs-component-tabs) {
  border: none;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  justify-content: center;
}

/* Nav item class */
.tabs-component :deep(.tabs-component-tab .is-active) {
  /* color: #a0a0a0; */
  /* color: rgb(83, 90, 94); */
  color: rgb(212, 149, 97);
}

.tabs-component :deep(.tabs-component-tab .is-inactive) {
  color: #a0a0a0;
  /* color: rgb(83, 90, 94); */
}

/* Active nav item */
.tabs-component :deep(.tabs-component-tab .is-active) {
    background: transparent;
    border: none;
    transition: all 0.5s;
    padding-right: 0;
    padding-left: 0;
    margin-right: 15px;
    margin-left: 15px;
  
}

/* List item */
.tabs-component :deep(.tabs-component-tabs > li) {
  list-style-type: none;
}

/* Hover effect */
.tabs-component :deep(.tabs-component-tabs > li > a:hover) {
  background: transparent;
  color: #cbcbcb;
  transition: all 0.5s;
  text-decoration: none;
}

/* Nav link class */
.tabs-component :deep(.tabs-component-tab .tabs-component-tabs >li>a) {
  background: transparent;
  border: none;
  transition: all 0.5s;
}

/* Nav link after pseudo-element */
.tabs-component :deep(.tabs-component-tabs > li .is-inactive > a::after) {
    content: "";
    width: 30%;
    position: relative;
    bottom: 3px;
    border-width: 0 0 2px;
    border-style: solid;
    transition: all 0.5s;
}

/* Active nav link after pseudo-element */
.tabs-component :deep(.tabs-component-tabs > li.is-active > a::after) {
    width: 100%;
    transition: all 0.5s;
}

.design-img {
  width: 100%;
  border-radius: 15px;
  transition: all 0.5s;
}

.dimg {
  position: relative;
  border-radius: 15px;
}
.middle {
  transition: all 0.5s;
  opacity: 0;
  position: absolute;
  bottom: 0px;
  left: 70px;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  padding: 20px;
}

.dimg:hover .design-img {
  position: relative;
  border-radius: 15px;
  opacity: 0.1;
  cursor: pointer;
}

.dimg:hover .middle {
  opacity: 1;
}

.vueperslide :deep(.vueperslide) {
  border-radius: 10px !important;
}
.vueperslide:deep(.vueperslides__parallax-wrapper) {
  border-radius: 10px !important;
}

.btn {
  border-color: #669db3ff;
  color: #669db3ff;
}

.btn:hover {
  background-color: #669db3ff;
  border-color: #669db3ff;
  color: white;
}

.btn:focus {
  background-color: #669db3ff;
  border-color: #669db3ff;
  color: white;
}
.vueperslide:deep(.vueperslides__arrow) {
  outline: none !important;
  border: none;
  color: grey;
}

.badge {
  background-color: rgb(211, 227, 233);
  transition: all 0.5s;
  font-weight: 500;
  font-size: 13px;
}

.bg-dark4 {
  background-color: #494e55 !important;
}

.date {
  font-size: 14px;
  font-weight: 400;
  opacity: 0.75
}

.skeleton-container {
  margin-bottom: 20px;
}
</style>
