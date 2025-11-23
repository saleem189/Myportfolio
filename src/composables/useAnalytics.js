export function useAnalytics() {
  const trackEvent = (eventName, eventParams = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        ...eventParams,
        page_location: window.location.href,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const trackSectionView = (sectionName, sectionTitle) => {
    trackEvent('section_view', {
      section_name: sectionName,
      section_title: sectionTitle,
    });
  };

  const trackFormInteraction = (formName, fieldName) => {
    trackEvent('form_field_interaction', {
      form_name: formName,
      field_name: fieldName,
    });
  };

  const trackFormSubmit = (formName, value = 1) => {
    trackEvent('form_submit', {
      form_name: formName,
      value,
    });
  };

  const trackFormError = (formName, errorType) => {
    trackEvent('form_error', {
      form_name: formName,
      error_type: errorType,
    });
  };

  const trackPortfolioFilter = (category) => {
    trackEvent('portfolio_filter', {
      filter_category: category,
    });
  };

  const trackPortfolioClick = (projectName, category = 'development') => {
    trackEvent('portfolio_project_click', {
      project_name: projectName,
      project_category: category,
    });
  };

  return {
    trackEvent,
    trackSectionView,
    trackFormInteraction,
    trackFormSubmit,
    trackFormError,
    trackPortfolioFilter,
    trackPortfolioClick,
  };
}
