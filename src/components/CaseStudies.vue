<template>
  <Section
    id="case-studies"
    title="Selected Engineering Case Studies"
  >
    <p :class="['max-w-3xl text-lg mb-8 leading-relaxed', themeClasses.classes.textSecondary()]">
      A focused view of product work, technical decisions, and delivery outcomes. Details are limited to information that is safe to share publicly.
    </p>

    <div class="grid gap-6 lg:grid-cols-3">
      <article
        v-for="study in caseStudies"
        :key="study.id"
        :class="['sketchy-border p-6 flex flex-col', themeClasses.classes.bg()]"
      >
        <p :class="['text-sm font-bold uppercase tracking-wide mb-2', themeClasses.themeClass('text-blue-700', 'text-blue-300')]">
          {{ study.company }}
        </p>
        <h3 :class="['text-2xl font-bold mb-1', themeClasses.classes.textHeading()]">
          {{ study.role }}
        </h3>
        <p :class="['text-sm mb-5', themeClasses.classes.textMuted()]">
          {{ study.period }}
        </p>
        <p :class="['mb-5 leading-relaxed', themeClasses.classes.textSecondary()]">
          {{ study.summary }}
        </p>

        <div class="space-y-4 flex-1">
          <div>
            <h4 :class="['font-bold mb-1', themeClasses.classes.text()]">
              Problem
            </h4>
            <p :class="themeClasses.classes.textSecondary()">
              {{ study.problem }}
            </p>
          </div>
          <div>
            <h4 :class="['font-bold mb-1', themeClasses.classes.text()]">
              Approach
            </h4>
            <p :class="themeClasses.classes.textSecondary()">
              {{ study.approach }}
            </p>
          </div>
          <div>
            <h4 :class="['font-bold mb-2', themeClasses.classes.text()]">
              My contributions
            </h4>
            <ul :class="['space-y-2', themeClasses.classes.textSecondary()]">
              <li
                v-for="contribution in study.contributions"
                :key="contribution"
                class="flex gap-2"
              >
                <span aria-hidden="true">•</span>
                <span>{{ contribution }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          v-if="study.outcomes?.length"
          :class="['mt-5 border-t pt-4', themeClasses.classes.borderSecondary()]"
        >
          <h4 :class="['font-bold mb-2', themeClasses.classes.text()]">
            Outcomes
          </h4>
          <ul :class="['space-y-1', themeClasses.classes.textSecondary()]">
            <li
              v-for="outcome in study.outcomes"
              :key="outcome"
            >
              {{ outcome }}
            </li>
          </ul>
        </div>

        <div class="flex flex-wrap gap-2 mt-5">
          <span
            v-for="technology in study.technologies"
            :key="technology"
            :class="[
              'text-xs border px-2 py-1 rounded',
              themeClasses.themeClass('border-gray-300 bg-gray-100 text-gray-700', 'border-slate-600 bg-slate-700 text-slate-200'),
            ]"
          >
            {{ technology }}
          </span>
        </div>
      </article>
    </div>
  </Section>
</template>

<script setup>
import Section from './helpers/Section.vue';
import info from '../../info';
import { useThemeClasses } from '@/composables/useThemeClasses';

const themeClasses = useThemeClasses();
const caseStudies = info.featuredExperiences;
</script>
