import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso de Privacidad · Mulan',
  description: 'Términos y Condiciones de Venta y Política de Privacidad de Mulan Shop.',
};

export default function AvisoDePrivacidadPage() {
  return (
    <main className="px-5 py-16 md:px-12 md:py-24">
      <div className="max-w-[720px] mx-auto">

        {/* Header */}
        <div className="mb-14">
          <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone mb-4">Legal</div>
          <h1 className="font-display text-[36px] leading-[1.05] font-normal tracking-[-0.015em] text-sumi mb-3 md:text-[48px]">
            Términos y Condiciones<br /><em className="font-normal">& Política de Privacidad</em>
          </h1>
          <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-stone">
            Última actualización: 21 de noviembre de 2025
          </p>
        </div>

        {/* Legal disclaimer */}
        <div className="border-l-2 border-ash pl-5 mb-14">
          <p className="font-body text-[13px] leading-[1.7] text-stone italic">
            Este documento es un borrador generado con asistencia de IA con base en información proporcionada por el operador del sitio. Se recomienda que sea revisado por un abogado especializado en comercio electrónico y protección de datos en México antes de su publicación, para confirmar el cumplimiento total de la LFPDPPP, la Ley Federal de Protección al Consumidor (LFPC) y demás normativa aplicable.
          </p>
        </div>

        {/* Table of contents */}
        <nav className="mb-16 p-6 border border-linen">
          <div className="font-mono text-[9.5px] tracking-[0.25em] uppercase text-stone mb-5">Índice</div>
          <div className="grid grid-cols-1 gap-y-1 md:grid-cols-2 md:gap-x-8">
            <div>
              <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-ash mb-3">Parte 1 · Términos</div>
              {[
                ['#identidad', '1. Identidad del comercio'],
                ['#productos', '2. Productos y disponibilidad'],
                ['#precios', '3. Precios y pagos'],
                ['#envios', '4. Envíos'],
                ['#cambios', '5. Cambios y devoluciones'],
                ['#garantias', '6. Garantías'],
                ['#cuentas', '7. Cuentas de usuario'],
                ['#propiedad', '8. Propiedad intelectual'],
                ['#uso', '9. Uso permitido del sitio'],
                ['#responsabilidad', '10. Limitación de responsabilidad'],
                ['#modificaciones', '11. Modificaciones'],
                ['#legislacion', '12. Legislación y jurisdicción'],
                ['#contacto-terminos', '13. Contacto'],
              ].map(([href, label]) => (
                <a key={href} href={href} className="block font-body text-[13px] text-slate no-underline hover:text-sumi transition-colors py-0.5">
                  {label}
                </a>
              ))}
            </div>
            <div>
              <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-ash mb-3">Parte 2 · Privacidad</div>
              {[
                ['#info-personal', 'Información que recopilamos'],
                ['#fuentes', 'Fuentes de información'],
                ['#uso-info', 'Cómo usamos su información'],
                ['#divulgacion', 'Cómo divulgamos la información'],
                ['#shopify', 'Relación con Shopify'],
                ['#terceros', 'Sitios web de terceros'],
                ['#menores', 'Datos de menores'],
                ['#seguridad', 'Seguridad y retención'],
                ['#derechos', 'Sus derechos ARCO'],
                ['#reclamaciones', 'Reclamaciones'],
                ['#transferencias', 'Transferencias internacionales'],
                ['#cambios-politica', 'Cambios en esta Política'],
                ['#contacto-privacidad', 'Contacto'],
              ].map(([href, label]) => (
                <a key={href} href={href} className="block font-body text-[13px] text-slate no-underline hover:text-sumi transition-colors py-0.5">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* ── PARTE 1 ── */}
        <section className="mb-20">
          <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone mb-3">Parte 1</div>
          <h2 className="font-display text-[28px] font-normal tracking-[-0.01em] text-sumi mb-8 md:text-[36px]">
            Términos y Condiciones de Venta
          </h2>
          <p className="font-body text-[15px] leading-[1.75] text-slate mb-10">
            Estos Términos y Condiciones de Venta (los "Términos") regulan el uso del sitio web y la tienda en línea de Mulan Shop (el "Sitio", los "Servicios"), así como cualquier compra realizada a través de él. Al navegar, crear una cuenta o realizar un pedido en el Sitio, usted (el "Cliente") acepta quedar obligado por estos Términos. Si no está de acuerdo con ellos, le pedimos no utilizar el Sitio.
          </p>

          <LegalSection id="identidad" number="1" title="Identidad del comercio">
            <p>Mulan Shop opera este Sitio con tecnología de Shopify, ofreciendo productos a través de comercio electrónico al público en territorio mexicano. Los datos de contacto del comercio son:</p>
            <ul>
              <li>Correo electrónico: soportemulanshop@gmail.com</li>
              <li>Domicilio: C. Bahía de las Palmas 33, Ciudad de México, DF, 11300, México</li>
            </ul>
          </LegalSection>

          <LegalSection id="productos" number="2" title="Productos y disponibilidad">
            <ul>
              <li><strong>Descripciones e imágenes.</strong> Hacemos un esfuerzo razonable para que las descripciones, fotografías y precios de los productos sean precisos. Sin embargo, no garantizamos que las imágenes reflejen con exactitud absoluta el color, textura o acabado del producto debido a variaciones en pantallas y dispositivos.</li>
              <li><strong>Disponibilidad.</strong> Todos los productos están sujetos a disponibilidad. Si un artículo se agota después de confirmado su pedido, le notificaremos y le ofreceremos un reembolso completo o la opción de elegir un producto sustituto.</li>
              <li><strong>Errores de precio o descripción.</strong> En caso de un error evidente de precio o descripción, Mulan Shop se reserva el derecho de cancelar el pedido correspondiente, notificando al Cliente y reembolsando cualquier cantidad ya cobrada.</li>
            </ul>
          </LegalSection>

          <LegalSection id="precios" number="3" title="Precios y pagos">
            <ul>
              <li><strong>Moneda y precios.</strong> Todos los precios se muestran en pesos mexicanos (MXN) e incluyen el Impuesto al Valor Agregado (IVA), salvo que se indique lo contrario.</li>
              <li><strong>Procesamiento de pagos.</strong> Los pagos se procesan de forma segura a través de la plataforma de pagos de Shopify y sus proveedores de servicios de pago integrados. Mulan Shop no almacena directamente los datos completos de su tarjeta; estos son tratados conforme a los estándares de seguridad (PCI-DSS) de Shopify y de la pasarela de pago correspondiente.</li>
              <li><strong>Confirmación del pedido.</strong> Un pedido se considera confirmado únicamente cuando el pago ha sido aprobado y usted recibe un correo electrónico de confirmación.</li>
              <li><strong>Cargos rechazados o fraudulentos.</strong> Mulan Shop se reserva el derecho de cancelar cualquier pedido en el que se detecten indicios razonables de fraude, uso no autorizado de un medio de pago, o irregularidades en la información proporcionada.</li>
            </ul>
          </LegalSection>

          <LegalSection id="envios" number="4" title="Envíos">
            <ul>
              <li><strong>Cobertura.</strong> Realizamos envíos a todo el territorio nacional mexicano a través de paqueterías asociadas.</li>
              <li><strong>Tiempos de entrega.</strong> Los tiempos de entrega son estimados y pueden variar según el destino, la paquetería utilizada y circunstancias fuera de nuestro control. Mulan Shop no se hace responsable por retrasos ocasionados directamente por la paquetería.</li>
              <li><strong>Costos de envío.</strong> El costo de envío se calcula y muestra al Cliente antes de confirmar la compra, durante el proceso de pago.</li>
              <li><strong>Revisión al recibir.</strong> Le recomendamos revisar el paquete al momento de la entrega. Cualquier daño visible debe reportarse a soportemulanshop@gmail.com dentro de las 24 horas siguientes a la recepción, idealmente con fotografías.</li>
            </ul>
          </LegalSection>

          <LegalSection id="cambios" number="5" title="Cambios y devoluciones">
            <ul>
              <li><strong>Plazo.</strong> El Cliente cuenta con 15 días naturales, contados a partir de la fecha de recepción del pedido, para solicitar un cambio o devolución.</li>
              <li><strong>Condiciones del producto.</strong> Para que el cambio o devolución proceda, el producto debe encontrarse sin usar, en su empaque original y con todas sus etiquetas, salvo que la devolución se deba a un defecto de fabricación.</li>
              <li><strong>Costo de envío de la devolución.</strong> Corre por cuenta del Cliente, excepto cuando la devolución se deba a un error de Mulan Shop.</li>
              <li><strong>Procedimiento.</strong> Escribir a soportemulanshop@gmail.com indicando número de pedido, producto y motivo.</li>
              <li><strong>Reembolsos.</strong> Una vez recibido e inspeccionado el producto devuelto, el reembolso se procesará al mismo método de pago utilizado en la compra original, generalmente de 5 a 15 días hábiles.</li>
            </ul>
            <div className="border-l-2 border-ash pl-4 mt-4">
              <p className="font-body text-[13px] text-stone italic">Este derecho de cambio/devolución es independiente y adicional a cualquier garantía legal por defectos del producto que asista al Cliente conforme a la Ley Federal de Protección al Consumidor.</p>
            </div>
          </LegalSection>

          <LegalSection id="garantias" number="6" title="Garantías">
            <p>Todos los productos cuentan con garantía contra defectos de fabricación conforme a lo dispuesto por la Ley Federal de Protección al Consumidor. Si un producto presenta un defecto de fabricación dentro de un plazo razonable de uso, el Cliente puede solicitar su reparación, reposición o reembolso, escribiendo a soportemulanshop@gmail.com.</p>
          </LegalSection>

          <LegalSection id="cuentas" number="7" title="Cuentas de usuario">
            <ul>
              <li>El Cliente es responsable de mantener la confidencialidad de sus credenciales de acceso y de toda actividad realizada desde su cuenta.</li>
              <li>Mulan Shop se reserva el derecho de suspender o cancelar cuentas que incumplan estos Términos o que se utilicen con fines fraudulentos.</li>
            </ul>
          </LegalSection>

          <LegalSection id="propiedad" number="8" title="Propiedad intelectual">
            <p>Todo el contenido del Sitio —incluyendo textos, gráficos, logotipos, fotografías, imágenes de producto y diseño— es propiedad de Mulan Shop o de sus licenciantes, y está protegido por las leyes de propiedad intelectual aplicables en México. Queda prohibida su reproducción, distribución o uso comercial sin autorización previa y por escrito.</p>
          </LegalSection>

          <LegalSection id="uso" number="9" title="Uso permitido del sitio">
            <p>El Cliente se compromete a utilizar el Sitio únicamente para fines lícitos. Queda prohibido, entre otros:</p>
            <ul>
              <li>Utilizar el Sitio de forma que pueda dañar, deshabilitar o sobrecargar su infraestructura.</li>
              <li>Intentar obtener acceso no autorizado a sistemas, cuentas o datos de otros usuarios.</li>
              <li>Utilizar el Sitio para fines fraudulentos o para realizar compras con medios de pago no autorizados.</li>
            </ul>
          </LegalSection>

          <LegalSection id="responsabilidad" number="10" title="Limitación de responsabilidad">
            <p>En la máxima medida permitida por la ley aplicable, Mulan Shop no será responsable por daños indirectos, incidentales o consecuentes derivados del uso del Sitio o de los productos adquiridos, salvo en los casos en que dicha limitación no sea válida conforme a la legislación mexicana de protección al consumidor. Nada en estos Términos limita los derechos irrenunciables del Cliente bajo la Ley Federal de Protección al Consumidor.</p>
          </LegalSection>

          <LegalSection id="modificaciones" number="11" title="Modificaciones a los Términos">
            <p>Mulan Shop podrá actualizar estos Términos en cualquier momento. La versión vigente será siempre la publicada en el Sitio, junto con su fecha de "Última actualización". El uso continuado del Sitio después de una modificación constituye la aceptación de los Términos actualizados.</p>
          </LegalSection>

          <LegalSection id="legislacion" number="12" title="Legislación aplicable y jurisdicción">
            <p>Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos. Para la interpretación y cumplimiento de los presentes Términos, el Cliente y Mulan Shop se someten a los tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles por razón de su domicilio presente o futuro. Lo anterior sin perjuicio del derecho del consumidor de acudir a la Procuraduría Federal del Consumidor (PROFECO) para la resolución de controversias de consumo.</p>
          </LegalSection>

          <LegalSection id="contacto-terminos" number="13" title="Contacto">
            <ul>
              <li>Correo electrónico: soportemulanshop@gmail.com</li>
              <li>Domicilio: C. Bahía de las Palmas 33, Ciudad de México, DF, 11300, México</li>
            </ul>
          </LegalSection>
        </section>

        {/* Divider */}
        <div className="border-t border-linen mb-20" />

        {/* ── PARTE 2 ── */}
        <section>
          <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone mb-3">Parte 2</div>
          <h2 className="font-display text-[28px] font-normal tracking-[-0.01em] text-sumi mb-3 md:text-[36px]">
            Política de Privacidad
          </h2>
          <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-stone mb-8">
            Última actualización: 21 de noviembre de 2025
          </p>
          <p className="font-body text-[15px] leading-[1.75] text-slate mb-10">
            Mulan Shop gestiona esta tienda y este sitio web, incluidos los datos, el contenido, las funciones, las herramientas, los productos y los servicios para ofrecerle a usted, el cliente, una experiencia de compra seleccionada (los "Servicios"). Esta Política de privacidad describe cómo recopilamos, utilizamos y divulgamos su información personal cuando visita, utiliza o realiza una compra a través de los Servicios o cuando se comunica con nosotros por cualquier otro medio.
          </p>

          <LegalSection id="info-personal" title="Información personal que recopilamos o tratamos">
            <p>Podemos recopilar o tratar las siguientes categorías de información personal:</p>
            <ul>
              <li><strong>Detalles de contacto:</strong> nombre, dirección, dirección de facturación, dirección de envío, número de teléfono y correo electrónico.</li>
              <li><strong>Información financiera:</strong> números de tarjeta, información de pagos y datos de transacciones.</li>
              <li><strong>Información de la cuenta:</strong> nombre de usuario, contraseña, preguntas de seguridad y preferencias.</li>
              <li><strong>Información sobre transacciones:</strong> artículos consultados, añadidos al carrito, comprados, devueltos o cancelados.</li>
              <li><strong>Comunicaciones con nosotros:</strong> información facilitada al contactar al servicio de atención al cliente.</li>
              <li><strong>Información del dispositivo:</strong> dirección IP, tipo de navegador y otros identificadores únicos.</li>
              <li><strong>Información sobre el uso:</strong> modo y momento en que utiliza o navega por los Servicios.</li>
            </ul>
          </LegalSection>

          <LegalSection id="fuentes" title="Fuentes de información personal">
            <ul>
              <li><strong>Directamente de usted</strong> cuando crea una cuenta, visita o utiliza los Servicios.</li>
              <li><strong>Automáticamente</strong> a través de cookies y tecnologías similares.</li>
              <li><strong>De nuestros proveedores de servicios</strong> cuando los contratamos para habilitar determinada tecnología.</li>
              <li><strong>De nuestros partners</strong> o de otros terceros.</li>
            </ul>
          </LegalSection>

          <LegalSection id="uso-info" title="Cómo utilizamos su información personal">
            <ul>
              <li><strong>Prestar y mejorar los Servicios:</strong> procesar pagos, gestionar pedidos, organizar envíos, facilitar devoluciones y ofrecer una experiencia personalizada.</li>
              <li><strong>Marketing y publicidad:</strong> enviarle comunicaciones comerciales y mostrarle anuncios relevantes.</li>
              <li><strong>Seguridad y prevención de fraudes:</strong> autenticar su cuenta y detectar actividades ilegales o malintencionadas.</li>
              <li><strong>Comunicaciones con usted:</strong> atención al cliente y respuesta a sus solicitudes.</li>
              <li><strong>Motivos legales:</strong> cumplir con la legislación aplicable y responder a procedimientos legales.</li>
            </ul>
          </LegalSection>

          <LegalSection id="divulgacion" title="Cómo divulgamos la información personal">
            <p>En determinadas circunstancias, podemos divulgar su información personal a terceros:</p>
            <ul>
              <li>Con Shopify, proveedores y terceros que prestan servicios en nuestro nombre (gestión de TI, procesamiento de pagos, análisis de datos, atención al cliente, almacenamiento en la nube, gestión de pedidos y envíos).</li>
              <li>Con partners comerciales y de marketing para mostrarle publicidad personalizada.</li>
              <li>Cuando usted lo solicite o consienta la divulgación a terceros.</li>
              <li>Con nuestros afiliados o dentro de nuestro grupo empresarial.</li>
              <li>En relación con una transacción comercial o para cumplir obligaciones legales.</li>
            </ul>
          </LegalSection>

          <LegalSection id="shopify" title="Relación con Shopify">
            <p>Los Servicios se alojan en Shopify, que recopila y procesa información personal sobre su acceso y uso de los Servicios. La información que usted envíe a los Servicios se transmitirá y compartirá con Shopify y con terceros que podrían estar ubicados en países diferentes al suyo. Para más información, puede consultar la{' '}
              <a href="https://privacy.shopify.com/en" target="_blank" rel="noopener noreferrer" className="text-sumi underline hover:opacity-60 transition-opacity">
                Política de privacidad del consumidor de Shopify
              </a>.
            </p>
          </LegalSection>

          <LegalSection id="terceros" title="Sitios web y enlaces de terceros">
            <p>Los Servicios pueden incluir enlaces a sitios web u otras plataformas en línea gestionadas por terceros. Le recomendamos revisar sus políticas de privacidad y seguridad, ya que no nos hacemos responsables de la privacidad o seguridad de dichos sitios.</p>
          </LegalSection>

          <LegalSection id="menores" title="Datos de menores">
            <p>Los Servicios no están destinados a ser utilizados por menores de edad, y no recopilamos conscientemente información personal de menores. Si usted es padre, madre o tutor legal de un menor que nos haya facilitado su información personal, puede contactarnos para solicitar su eliminación.</p>
          </LegalSection>

          <LegalSection id="seguridad" title="Seguridad y retención de su información">
            <p>Ninguna medida de seguridad es perfecta o infalible, y no podemos garantizar una "seguridad absoluta". Le recomendamos no utilizar canales no seguros para enviarnos información sensible. El tiempo durante el cual conservamos su información personal depende de factores como la necesidad de mantener su cuenta, prestarle los Servicios y cumplir obligaciones legales.</p>
          </LegalSection>

          <LegalSection id="derechos" title="Sus derechos y opciones (Derechos ARCO)">
            <p>Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), usted tiene los siguientes derechos:</p>
            <ul>
              <li><strong>Derecho de acceso.</strong> Puede solicitar el acceso a la información personal que conservamos sobre usted.</li>
              <li><strong>Derecho de rectificación.</strong> Puede solicitar que corrijamos información personal inexacta o desactualizada.</li>
              <li><strong>Derecho de cancelación (supresión).</strong> Puede solicitarnos la eliminación de la información personal cuando sea procedente conforme a la ley.</li>
              <li><strong>Derecho de oposición.</strong> Puede oponerse al tratamiento de sus datos para fines específicos, como marketing directo.</li>
              <li><strong>Derecho a la portabilidad de los datos.</strong> Puede recibir una copia de su información personal en determinadas circunstancias.</li>
              <li><strong>Gestión de preferencias de comunicación.</strong> Puede optar por no recibir correos promocionales mediante el enlace de cancelación de suscripción.</li>
            </ul>
          </LegalSection>

          <LegalSection id="reclamaciones" title="Reclamaciones">
            <p>Si tiene alguna reclamación sobre cómo tratamos su información personal, le rogamos contactarnos. Si considera que su derecho a la protección de datos personales ha sido lesionado, tiene derecho a acudir ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI) para hacer valer lo conducente.</p>
          </LegalSection>

          <LegalSection id="transferencias" title="Transferencias internacionales">
            <p>Podemos transferir, almacenar y tratar su información personal fuera del país en el que reside. Si transferimos su información personal fuera del Espacio Económico Europeo o del Reino Unido, utilizaremos mecanismos de transferencia reconocidos, como las cláusulas contractuales estándar de la Comisión Europea.</p>
          </LegalSection>

          <LegalSection id="cambios-politica" title="Cambios en esta Política de privacidad">
            <p>Podemos actualizar esta Política de privacidad ocasionalmente para reflejar cambios en nuestras prácticas o por motivos operativos, legales o normativos. Publicaremos la versión actualizada en este sitio web y actualizaremos la fecha de "Última actualización".</p>
          </LegalSection>

          <LegalSection id="contacto-privacidad" title="Contacto">
            <p>Para preguntas sobre privacidad o para ejercer sus derechos ARCO:</p>
            <ul>
              <li>Correo electrónico: soportemulanshop@gmail.com</li>
              <li>Domicilio: C. Bahía de las Palmas 33, Ciudad de México, DF, 11300, México</li>
            </ul>
          </LegalSection>
        </section>

      </div>
    </main>
  );
}

function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="mb-10 scroll-mt-24">
      <h3 className="font-display text-[18px] font-normal tracking-[-0.01em] text-sumi mb-4 md:text-[20px]">
        {number && <span className="font-mono text-[11px] tracking-[0.18em] text-stone mr-3 align-middle">{number}.</span>}
        {title}
      </h3>
      <div className="font-body text-[15px] leading-[1.75] text-slate [&_p]:mb-4 [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:list-disc [&_strong]:text-sumi [&_strong]:font-normal">
        {children}
      </div>
    </div>
  );
}
