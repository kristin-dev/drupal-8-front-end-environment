<?php /**
 * @file
 * Contains \Drupal\towelthemetools\Controller\DefaultController.
 */

namespace Drupal\towelthemetools\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Component\Utility\UrlHelper;

/**
 * Default controller for the towelthemetools module.
 */
class DefaultController extends ControllerBase {

  /**
   * Page callback for /admin/appearance/design/toweltheme.
   *
   * Embeds the standalone version of the KSS design component library. This
   * allows the library to have access to all of the CSS and JS that is
   * loaded by the theme.
   */
  public function componentLibrary() {
    $subpath = '/index.html';
    $is_overview_page = TRUE;
    $current_path_raw = \Drupal::service('path.current')->getPath();
    $current_path = \Drupal::service('path.alias_manager')
      ->getAliasByPath($current_path_raw);
    $current_path_split = explode('admin/appearance/design/toweltheme', $current_path);
    if (!empty($current_path_split[1])) {
      $is_overview_page = FALSE;
      $subpath = UrlHelper::stripDangerousProtocols($current_path_split[1]);
    }

    if (\Drupal::service('theme_handler')->themeExists('toweltheme') === FALSE) {
      drupal_set_message(t('The Towel theme is not installed.'), 'warning');
      return array();
    }

    $styleguide_doc_original = file_get_contents(drupal_get_path('theme', 'toweltheme') . '/styleguide' . $subpath);

    // If this is the public folder, then it's not an HTML page:
    $path_args = explode('/', $current_path);
    if (!empty($path_args[3]) && $path_args[3] === 'public') {
      // Return the original file.
      print $styleguide_doc_original;
      exit();
    }
    // Else this is not in the public folder, assumes this is an HTML page:
    else {
      // Updates links to point to the cloned pages.
      $styleguide_doc_udpated_links = $this->updateLinks($styleguide_doc_original, $is_overview_page);
      // Gets the <body> element.
      $styleguide_doc_body = $this->bodyFromHtml($styleguide_doc_udpated_links);

      $page = [
        'body' => [
          '#prefix' => '<div id="kss-node">',
          '#suffix' => '</div>',
          '#theme' => 'towelthemetools_no_escape',
          '#output' => $styleguide_doc_body,
        ],
        '#attached' => [
          'library' => [
            'towelthemetools/kss'
          ],
        ],
      ];
    }

    return $page;
  }

  /**
   * Gets the <body> from an <html> document.
   *
   * @param $html string An HTML document.
   * @return string The <body> element of the document or an empty string if
   *   there is not a <body> element.
   */
  protected function bodyFromHtml($html) {
    $dom_original = new \DOMDocument;
    $dom_temporary = new \DOMDocument;

    libxml_use_internal_errors(TRUE);
    $dom_original->loadHTML($html);
    libxml_clear_errors();
    libxml_use_internal_errors(FALSE);
    $body = $dom_original->getElementsByTagName('body')->item(0);
    foreach ($body->childNodes as $child) {
      $dom_temporary->appendChild($dom_temporary->importNode($child, TRUE));
    }

    return $dom_temporary->saveHTML();
  }

  /**
   * Updates links in the styleguide so that they point to the correct folder.
   *
   * @param $html string The raw HTML.
   * @param $is_overview_page boolean Whether or not this is the overview page.
   * @return string The processed HTML.
   */
  protected function updateLinks($html, $is_overview_page) {
    $dom = new \DOMDocument;

    libxml_use_internal_errors(TRUE);
    $dom->loadHTML($html);
    libxml_clear_errors();
    libxml_use_internal_errors(FALSE);
    $nodes = $dom->getElementsByTagName('a');
    // @see http://php.net/manual/en/class.domelement.php
    foreach ($nodes as $node) {
      // Ignores links that have no href attribute.
      if (!$node->hasAttribute('href')) {
        continue;
      }

      $href = $node->getAttribute('href');
      // Ignores empty links.
      if (empty($href)) {
        continue;
      }

      $orig = $node;
      // If this is the overview page:
      if ($is_overview_page === TRUE) {
        // Ignores absolute links.
        if (0 === strpos($href, '/')
          || 0 === strpos($href, 'http')
          // Ignore anchors.
          || 0 === strpos($href, '#')
          // Ignores links if they already begin correctly
          || 0 === strpos($href, 'toweltheme/')
        ) {
          continue;
        }
        // Removes the trailing slash from overview link.
        if ($href === './') {
          $node->setAttribute('href', '');
        }
        else {
          $node->setAttribute('href', 'toweltheme/' . $href);
        }
      }
      // Else this is a subpage:
      else {
        // Removes the trailing slash from overview link.
        if ($href === './') {
          $node->setAttribute('href', '../toweltheme');
        }
        else {
          continue;
        }
      }

      $orig->parentNode->replaceChild($node, $orig);
    }

    return $dom->saveHTML();
  }

}
