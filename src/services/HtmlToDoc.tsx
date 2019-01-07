import * as _ from "lodash";

export class HtmlToDoc {

  private now = new Date().getTime();
  private proto = new RegExp(/^(http|https|file):/);
  private ab = new RegExp(/^\//);
  private callback = false;

  private finish(): void {
    if( this.options.debug ) {
      this.debug_fn('finish action');
    }

    if (this.callback) {
      const blob = new Blob([this.options.html], {
        type: "application/msword"
      });
      this.callback(null, blob);
    } else {
      this.saveHtmlAsFile(this.options.filename, this.options.html);
    }
  }

  private options = {
    // These are the defaults.
    area: "div.googoose-wrapper",
    headerfooterid: "googoose-hdrftrtbl",
    margins: "1.0in",
    zoom: "75",
    filename: "Doc1_" + this.now + ".doc",
    size: "8.5in 11.0in",
    display: "Print",
    lang: "en-US",
    toc: "div.googoose.toc",
    pagebreak: "div.googoose.break",
    headerarea: "div.googoose.header",
    footerarea: "div.googoose.footer",
    headerid: "googoose-header",
    footerid: "googoose-footer",
    headermargin: ".5in",
    footermargin: ".5in",
    currentpage: "span.googoose.currentpage",
    totalpage: "span.googoose.totalpage",
    finishaction: GG.finish,
    html: null,
    initobj: document,
    debugtype: "alert",
    debug: 0
  };

  public constructor(overwrites: any, callback: any) {
    this.options = {
      ...this.options,
      ...overwrites
    };

    if(callback) {
      this.callback = callback;
    }
  }

  //http://requiremind.com/memoization-speed-up-your-javascript-performance/
  private memoize(fn: any, resolver: any): any {
    const memoized = function(): any {
      resolver  = resolver || JSON.stringify;
      const cache = memoized.cache;
      const args  = Array.prototype.slice.call(arguments);
      const key   = resolver.apply(this: any, args);
      if(key in cache) {
        this.debug_fn("hit cache");
        return cache[key];
      }
      var result = fn.apply(this, arguments);
      cache[key] = result;
      return result;
    };
    memoized.cache = {};
    return memoized;
  }

      GG.debug_fn = function( args ) {
        options.debugtype == 'console' ? console.log( args ) : alert( args );
      }

      //http://stackoverflow.com/questions/18755750/saving-text-in-a-local-file-in-internet-explorer-10
      private saveHtmlAsFile(
        fileNameToSaveAs: string,
        textToWrite: any
      ) {
        /* Saves a text string as a blob file*/
        const ie = navigator.userAgent.match(/MSIE\s([\d.]+)/);
        const ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/);
        const ieEDGE = navigator.userAgent.match(/Edge/g);
        const ieVer=(ie ? ie[1] : (ie11 ? 11 : (ieEDGE ? 12 : -1)));

        if (ie && ieVer<10) {
          console.log("No blobs on IE ver<10");
          return;
        }

        const textFileAsBlob = new Blob([textToWrite], {
          type: "application/msword"
        });

        if (ieVer>-1) {
          window.navigator.msSaveBlob(textFileAsBlob, fileNameToSaveAs);

        } else {
          const downloadLink = document.createElement("a");
          downloadLink.download = fileNameToSaveAs;
          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
          downloadLink.onclick = (e): void => { document.body.removeChild(e.target); };
          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink);
          downloadLink.click();
        }
      }

      // http://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it
      private decodeHtmlEntity(str: string): string {
        return str.replace(/&#(\d+);/g, (match, dec) => {
          return String.fromCharCode(dec);
        });
      }


      private translate_mso_features( html: any ): void {
        if( this.options.debug ) {
          this.debug_fn("GG.translate_mso_features");
        }

        html = this.decodeHtmlEntity(html);
        html = this.remove_bad_tags(html);
        html = this.convert_pagebreaks(html);
        html = this.convert_toc(html);
        html = this.convert_hdrftr(html);
        html = this.convert_imgs(html);

        return html;
      }

      private remove_bad_tags( html: any ): any {
        if( this.options.debug ) {
          this.debug_fn("GG.remove_bad_tags");
        }
        const thtml = $(html);

        thtml.find("noscript").each(() => {
          $(this).replaceWith("");
        });
        thtml.each(function() {
          if($(this).is(":hidden")){
            $(this).remove();
          }
        });

        html = thtml[0].outerHTML;
        return html;
      }

      private convert_pagebreaks( html: any ): any {
        if( this.options.debug ) {
          this.debug_fn("GG.convert_pagebreaks");
        }
        // user decides in html what will be a page break in word, this converts to a page break
        if(this.options.pagebreak ) {
          const thtml = $(html);
          thtml.find(this.options.pagebreak).replaceWith(this.get_pagebreak());
          html = thtml[0].outerHTML;
        }
        return html;
      }

      private convert_toc( html: any ): void {
        if( this.options.debug ) {
          this.debug_fn("GG.convert_toc");
        }
        // user determines in html what will be the toc in word
        if( this.options.toc && $(this.options.toc).length ) {
          const thtml = $(html);
          thtml.find(this.options.toc).replaceWith(this.get_toc_contents());
          html = thtml[0].outerHTML;
        }
        return html;
      }

      GG.convert_hdrftr = function( html ) {
        if( options.debug )
          GG.debug_fn('GG.convert_hdrftr');
        var hvis = options.headerarea && $(options.headerarea).length;
        var fvis = options.footerarea && $(options.footerarea).length;
        if( hvis || fvis ) {
          var thtml = $('<div>' + html + '</div>' );
          var hdrftr = $('<table id=\'' + options.headerfooterid + '\'></table>');
          hdrftr.append('<tr><td class=h></td><td class=f></td></tr>');
          thtml.append(hdrftr);
          html = thtml[0].outerHTML;

          html = GG.convert_totalpage(html);
          html = GG.convert_currentpage(html);
        }

        var thtml = $(html);
        if( hvis ) {
          var new_header = thtml.find(options.headerarea)[0].outerHTML;
          thtml.find(options.headerarea).replaceWith('');
          thtml.find('table#' + options.headerfooterid + ' .h').append(
            GG.headerstart() + new_header + GG.headerend() );
          html = thtml[0].outerHTML;
        }
        if( fvis ) {
          var new_footer = thtml.find(options.footerarea)[0].outerHTML;
          thtml.find(options.footerarea).replaceWith('');
          thtml.find('table#' + options.headerfooterid + ' .f').append(
            GG.footerstart() + new_footer + GG.footerend());
          html = thtml[0].outerHTML;
        }
        return html;

      }

      GG.convert_imgs = function( html ) {
        if( options.debug )
          GG.debug_fn('GG.convert_imgs');
        //make sure all standard images use absolute path
        var thtml = $(html);
        imgs = thtml.find('img');
        imgs.each(function() {
          var src = $(this)[0].src;
          var l = window.location;
          var t = l.protocol + '//' + l.host + '/';
          if( proto.test( src ) ) {
          } else if( ab.test( src ) ) {
            src = t + src;
          } else {
            var p = l.path.replace('/\/[^\/.]+$/', '/' );
            src = t + p + src;
          }
          $(this).attr( 'src', src );
        });
        html = thtml[0].outerHTML;
        return html;
      }

      GG.convert_totalpage = function(html) {
        if( options.debug )
          GG.debug_fn('GG.convert_totalpage');
        if( options.totalpage && $(options.totalpage).length ) {
          var thtml = $(html);
          thtml.find(options.totalpage).html('');
          thtml.find(options.totalpage).append( GG.get_total_page_number() );
          html = thtml[0].outerHTML;
        }
        return html;
      }

      GG.convert_currentpage = function(html) {
        if( options.debug )
          GG.debug_fn('GG.convert_currentpage');
        if( options.currentpage && $(options.currentpage).length ) {
          var thtml = $(html);
          thtml.find(options.currentpage).html('');
          thtml.find(options.currentpage).append( GG.get_page_number() );
          html = thtml[0].outerHTML;
        }
        return html;
      }

      GG.get_pagebreak = function() {
        if( options.debug )
          GG.debug_fn('GG.get_pagebreak');
        return '<br clear=all style=\'mso-special-character:line-break;page-break-before:always\'>';
      }

      GG.headerstart = function() {
        var html = '';
        html += '\n<div style=\'mso-element:header\' id=' + options.headerid + '>\n';
        html += '<p class="MsoHeader">\n';
        return html;
      }
      GG.headerend = function() {
        if( options.debug )
          GG.debug_fn('GG.headerend');
        return '</p></div>\n';
      }

      GG.footerstart = function() {
        if( options.debug )
          GG.debug_fn('GG.footerstart');
        var html = '';
        html += '<div style=\'mso-element:footer\' id=' + options.footerid + '>';
        return html;
      }
      GG.footerend = function() {
        if( options.debug )
          GG.debug_fn('GG.footerend');
        return '</div>\n';
      }

      GG.get_page_number = function() {
        if( options.debug )
          GG.debug_fn('GG.get_page_number');
        var html = '<!--[if supportFields]><span\n';
        html += 'class=MsoPageNumber><span style=\'mso-element:field-begin\'></span><span\n';
        html += 'style=\'mso-spacerun:yes\'> </span>PAGE <span style=\'mso-element:field-separator\'></span></span><![endif]--><span\n';
        html += 'class=MsoPageNumber><span style=\'mso-no-proof:yes\'>1</span></span><!--[if supportFields]><span\n';
        html += 'class=MsoPageNumber><span style=\'mso-element:field-end\'></span></span><![endif]-->';
        return html;
      }

      GG.get_total_page_number = function() {
        if( options.debug )
          GG.debug_fn('GG.get_total_page_number');
        var html = '<!--[if supportFields]><span class=MsoPageNumber><span \n';
        html += ' style=\'mso-element:field-begin\'></span> NUMPAGES <span style=\'mso-element:field-separator\'></span></span><![endif]--><span \n';
        html += ' class=MsoPageNumber><span style=\'mso-no-proof:yes\'>1</span></span><!--[if supportFields]><span \n'
        html += ' class=MsoPageNumber><span style=\'mso-element:field-end\'></span></span><![endif]-->\n';
        return html;
      }

      GG.get_toc_contents = function() {
        if( options.debug )
          GG.debug_fn('GG.get_toc_contents');
        var toc = '<p class=MsoToc1>\n';
        toc += '<!--[if supportFields]>\n';
        toc += '<span style=\'mso-element:field-begin\'></span>\n';
        toc += 'TOC \o "1-3" \\u \n';
        toc += '<span style=\'mso-element:field-separator\'></span>\n';
        toc += '<![endif]-->\n';
        toc += '<span style=\'mso-no-proof:yes\'>Table of content - Please right-click and choose "Update fields".</span>\n';
        toc += '<!--[if supportFields]>\n';
        toc += '<span style=\'mso-element:field-end\'></span>\n';
        toc += '<![endif]-->\n';
        toc += '</p>\n';

        return toc;
      }

      //TODO - figure out a way to simulate a right mpuse click, update fields


      GG.include_css = function( html ) {
        if( options.debug )
          GG.debug_fn('GG.include_css');
        //adding any header information that may be pertinent in teh copied html
        var tags = ['style', 'link'];
        for( i = 0; i < tags.length ; ++i ) {
          $(document).find(tags[i]).each( function( ) {
            if(tags[i] != 'link' || ($(this).attr('rel') == 'stylesheet' && proto.test($(this).attr('href')))) {
              html += ( '\n' + $(this)[0].outerHTML + '\n' );
            }
          } );
        }
        return html;
      }

      GG.html = function() {
        if( options.debug )
          GG.debug_fn('GG.html');
        if( !$(options.area).length ) {
          return null;
        }
//             // fixes IE pre tag handling
//             $('pre').each(function() {
//                 $(this)[0].outerHTML = $(this)[0].outerHTML.replace(/\n/g, "<br />\n");
//             });
        // adding the standard mso header
        var html = '<html xmlns:o=\'urn:schemas-microsoft-com:office:office\' xmlns:w=\'urn:schemas-microsoft-com:office:word\' xmlns=\'http://www.w3.org/TR/REC-html40\'>\n';
        html += '<head>\n';
        html += '<!--[if gte mso 9]>\n';
        html += '<xml>\n';
        html += '<w:WordDocument>\n';
        html += ( '<w:View>' + options.display + '</w:View>\n' );
        html += ('<w:Zoom>'+ options.zoom +'</w:Zoom>\n');
        html += '<w:DoNotOptimizeForBrowser/>\n';
        html += '</w:WordDocument>\n';
        html += '<o:OfficeDocumentSettings>\n';
        html += '<o:AllowPNG/>\n';
        html +='</o:OfficeDocumentSettings>\n';
        html += '</xml>\n';
        html += '<![endif]-->\n';
        html += '';

        html = GG.include_css( html );
        //adding in mso style necessesities
        html += '<style>\n';
        html += '<!--\n';
        html += '@page {\n';
        html += ('\tsize:' + options.size + ';\n');
        html += ('\tmargin:' + options.margins + ';\n');
        html += '}\n';
        html += '@page Container {\n';
        html += ('\tmso-header-margin:' + options.headermargin + ';\n' );
        html += ('\tmso-footer-margin:' + options.footermargin + ';\n' );
        html += ('\tmso-header:' + options.headerid + ';\n' );
        html += ('\tmso-footer:' + options.footerid + ';\n' );
        html += '}\n';
        html += 'div.Container { page:Container; }\n';
        html += ( 'table#' + options.headerfooterid + ' {\n' );
        html += '\tmargin:0in 0in 0in 9in;\n';
        html += '}\n';
        html += '-->\n';
        html += '</style>\n';

        //close head
        html += '</head>\n';

        //start body
        html += ('<body lang=' + options.lang + '>\n<div class=Container>');

        //add area content
        if($(options.initobj).is(options.area)) {
          if(options.debug)
            GG.debug_fn('is');
          html += GG.translate_mso_features($(options.initobj)[0].outerHTML);
        } else {
          if(options.debug)
            GG.debug_fn('no is');
          $(options.initobj).find(options.area).each(function(){
            html += GG.translate_mso_features($(this)[0].outerHTML);
          });
        }

        //close body
        html += '</div></body>\n';

        //close doc
        html += '</html>\n';
        return html;
      }

      //memoized fns
      //		GG.pngname = GG.memoize(GG.get_png_name);


      //execution
      if( options.debug )
        GG.debug_fn('googoose exec');
      options.html = GG.html();
      if( options.html && options.finishaction ) {
        options.finishaction();
      }
//         return options;
      return GG;
    };
  }( jQuery ));
}