const frame1 = (color: string, text: string, textColor: string, textUp: boolean = false): string => (
  `
    <svg
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      width="280"
      height="330"
      viewBox="0 0 74.083332 87.312502"
      version="1.1"
      id="svg830"
      inkscape:version="0.92.5 (2060ec1f9f, 2020-04-08)"
      sodipodi:docname="frame1.svg">
    <defs
        id="defs824" />
    <sodipodi:namedview
        id="base"
        pagecolor="#ffffff"
        bordercolor="#000000"
        borderopacity="1.0"
        inkscape:pageopacity="0.0"
        inkscape:pageshadow="2"
        inkscape:zoom="2.8"
        inkscape:cx="91.501171"
        inkscape:cy="309.30185"
        inkscape:document-units="mm"
        inkscape:current-layer="layer1"
        showgrid="false"
        units="px"
        inkscape:pagecheckerboard="true"
        inkscape:window-width="1600"
        inkscape:window-height="869"
        inkscape:window-x="0"
        inkscape:window-y="0"
        inkscape:window-maximized="1" />
    <metadata
        id="metadata827">
      <rdf:RDF>
        <cc:Work
            rdf:about="">
          <dc:format>image/svg+xml</dc:format>
          <dc:type
              rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
          <dc:title />
        </cc:Work>
      </rdf:RDF>
    </metadata>
    <g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(0,-209.68749)">
      ${!textUp ? `<path
          style="opacity:1;fill:${color};fill-opacity:1;stroke-width:0.60917741;stroke-miterlimit:4;stroke-dasharray:none"
          d="M 0 273.57227 L 0 324.94922 C 0 328.24206 2.652456 330.89062 5.9453125 330.89062 L 274.05664 330.89062 C 277.3495 330.89062 280 328.24206 280 324.94922 L 280 273.57227 L 271.99414 273.57227 L 269.8457 273.57227 L 10.15625 273.57227 L 8.5175781 273.57227 L 0 273.57227 z "
          transform="matrix(0.26458333,0,0,0.26458333,0,209.68749)"
          id="rect1403-3-6" />` : `<path
          style="opacity:1;fill:${color};fill-opacity:1;stroke-width:0.16117819;stroke-miterlimit:4;stroke-dasharray:none"
          d="m 74.150149,225.00604 v -13.59348 c 0,-0.87123 -0.701795,-1.572 -1.57303,-1.572 H 1.6393314 c -0.87123589,0 -1.57251399,0.70077 -1.57251399,1.572 v 13.59348 H 2.1850345 2.7534759 71.462975 71.89654 Z"
          id="rect1403-3-6"
          inkscape:connector-curvature="0" />`}
      <text
          xml:space="preserve"
          style="font-style:normal;font-weight:normal;font-size:9.34494591px;line-height:1.25;font-family:sans-serif;text-align:center;letter-spacing:0px;word-spacing:0px;text-anchor:middle;fill:${textColor};fill-opacity:1;stroke:none;stroke-width:0.23362364"
          x="41.993233"
          y="258.409"
          id="text1414"
          transform="scale(0.88298701,1.1325195)${textUp ? ' translate(0, -63)' : ''}"><tspan
            sodipodi:role="line"
            id="tspan1412"
            x="41.993233"
            y="258.409"
            style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-family:Arial;-inkscape-font-specification:Arial;text-align:center;text-anchor:middle;fill:${textColor};stroke-width:0.23362364">${text}</tspan></text>
      <path
          ${textUp ? 'transform="translate(0, 12.5)" ' : ''}
          inkscape:connector-curvature="0"
          style="opacity:1;fill:${color};fill-opacity:1;stroke-width:0.16117819;stroke-miterlimit:4;stroke-dasharray:none"
          d="m 1.5745806,209.68956 c -0.87123499,0 -1.57303099,0.70128 -1.57303099,1.57251 v 71.41012 c 0,0.87123 0.701796,1.57251 1.57303099,1.57251 H 72.512369 c 0.871236,0 1.572514,-0.70128 1.572514,-1.57251 v -71.41012 c 0,-0.87123 -0.701278,-1.57251 -1.572514,-1.57251 z m 2.923336,2.64583 H 69.589033 c 1.002387,0 1.809192,0.80681 1.809192,1.8092 v 65.09111 c 0,1.00239 -0.806805,1.8092 -1.809192,1.8092 H 4.4979166 c -1.002386,0 -1.809192,-0.80681 -1.809192,-1.8092 v -65.09111 c 0,-1.00239 0.806806,-1.8092 1.809192,-1.8092 z"
          id="rect1403-3" />
    </g>
  </svg>
`
);

export default frame1;
