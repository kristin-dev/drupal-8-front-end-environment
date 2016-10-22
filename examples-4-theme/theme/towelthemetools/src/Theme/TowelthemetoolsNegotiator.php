<?php
namespace Drupal\towelthemetools\Theme;

use Drupal\Core\Theme\ThemeNegotiatorInterface;
use Drupal\Core\Routing\RouteMatchInterface;

/**
 * Switches to the Towel theme for the design_component_library route.
 */
class TowelthemetoolsNegotiator implements ThemeNegotiatorInterface {
  /**
   * {@inheritdoc}
   */
  public function applies(RouteMatchInterface $route_match) {
    return $route_match->getRouteName() == 'towelthemetools.design_component_library';
  }

  /**
   * {@inheritdoc}
   */
  public function determineActiveTheme(RouteMatchInterface $route_match) {
    return 'toweltheme';
  }

}
